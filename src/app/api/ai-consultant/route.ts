import { NextRequest, NextResponse } from 'next/server';

// AI 美食顾问 API
export async function POST(request: NextRequest) {
    try {
        const { question } = await request.json();

        if (!question) {
            return NextResponse.json({ error: '请输入您的问题' }, { status: 400 });
        }

        // 调用 AI 服务（这里使用模拟响应，实际部署时替换为真实 API）
        const systemPrompt = `你是一位资深的南京本地美食达人，名叫"金陵老饕"。你对南京的大街小巷了如指掌，尤其擅长推荐地道的南京美食。
    
你的回答风格应该：
1. 热情亲切，像朋友推荐一样
2. 具体实用，给出店名、地址、人均消费
3. 如果用户提到预算，要严格按预算推荐
4. 推荐3-5个选项，并说明各自特色
5. 使用HTML格式，用<strong>标签高亮重点`;

        // 模拟 AI 响应（实际部署时替换为真实 API 调用）
        const mockResponse = `
<p>哇，来南京找美食找对人了！根据您的需求，我来推荐几家地道的南京菜馆：</p>

<p><strong>1. 南京大牌档（夫子庙店）</strong></p>
<p>📍 地址：秦淮区贡院街12号<br/>
💰 人均：60-80元<br/>
✨ 必点：盐水鸭、美龄粥、糖芋苗<br/>
这家是南京菜的集大成者，环境古色古香，适合外地游客打卡！</p>

<p><strong>2. 小潘记鸭血粉丝汤</strong></p>
<p>📍 地址：老门东历史街区内<br/>
💰 人均：25-35元<br/>
✨ 特色：汤底醇厚，鸭血鲜嫩<br/>
老门东里的老字号，排队也值得！</p>

<p><strong>3. 蒋有记锅贴</strong></p>
<p>📍 地址：老门东三条营<br/>
💰 人均：20-30元<br/>
✨ 特色：牛肉锅贴外酥里嫩，汁水丰富<br/>
南京本地人从小吃到大的味道！</p>

<p>祝您在南京吃得开心！有其他问题随时问我～ 🍜</p>
`;

        return NextResponse.json({ response: mockResponse });
    } catch (error) {
        console.error('AI 顾问错误:', error);
        return NextResponse.json(
            { error: '服务暂时不可用，请稍后再试' },
            { status: 500 }
        );
    }
}
