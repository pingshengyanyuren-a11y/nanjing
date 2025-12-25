import { NextRequest, NextResponse } from 'next/server';

// 从环境变量读取 API Key（安全）
const AI_API_KEY = process.env.SILICONFLOW_API_KEY || '';
const AI_BASE_URL = 'https://api.siliconflow.cn/v1/chat/completions';

// AI 美食顾问 API
export async function POST(request: NextRequest) {
    try {
        // 检查 API Key 是否配置
        if (!AI_API_KEY) {
            console.error('SILICONFLOW_API_KEY 环境变量未配置');
            return NextResponse.json(
                { response: 'AI 服务未配置，请在 .env.local 中设置 SILICONFLOW_API_KEY' },
                { status: 200 }
            );
        }

        const { question } = await request.json();

        if (!question) {
            return NextResponse.json({ response: '请输入您的问题' }, { status: 200 });
        }

        console.log('AI请求:', question);
        console.log('API Key (前10位):', AI_API_KEY.substring(0, 10) + '...');

        // 构造系统提示词，打造"南京美食老饕"人设
        const systemPrompt = `你是一个地道的南京"老饕"（美食家），对南京的街头巷尾、苍蝇馆子、地道小吃如数家珍。
你的语言风格应该是：热情、接地气、带有南京特色（偶尔可以说句"阿要辣油啊"）。
请针对用户的问题推荐性价比高、味道正宗的美食。如果用户提到学生身份或低预算，重点推荐便宜好吃的。
回答要简洁明了，直接给出店名、推荐理由和大致人均消费。
请使用HTML格式回复，用<strong>标签高亮店名，用<p>标签分段，用📍💰✨等emoji美化内容。`;

        // 调用 SiliconFlow AI API（使用更稳定的Qwen2.5-7B模型）
        const response = await fetch(AI_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AI_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'Qwen/Qwen2.5-7B-Instruct',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: question }
                ],
                temperature: 0.7,
                max_tokens: 1024,
            }),
        });

        console.log('API响应状态:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('AI API错误响应:', errorText);
            return NextResponse.json(
                { response: `AI服务暂时繁忙 (${response.status})，请稍后再试。` },
                { status: 200 }
            );
        }

        const data = await response.json();
        console.log('AI响应数据:', JSON.stringify(data).substring(0, 200));

        const answer = data.choices?.[0]?.message?.content || '抱歉，暂时无法获取推荐。';

        return NextResponse.json({ response: answer });
    } catch (error) {
        console.error('AI 顾问错误:', error);
        return NextResponse.json(
            { response: '网络连接失败，请检查网络后重试。' },
            { status: 200 }
        );
    }
}
