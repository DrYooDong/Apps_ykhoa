async function test() {
  try {
    const res = await fetch('http://localhost:20128/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'ROUTER',
        messages: [{ role: 'user', content: 'Xin chào! Hãy xác nhận kết nối qua ROUTER combo.' }],
        stream: false
      })
    });
    const text = await res.text();
    console.log("STATUS:", res.status);
    console.log("RESPONSE BODY:\n", text);
  } catch (err) {
    console.error('Error:', err);
  }
}

test();
