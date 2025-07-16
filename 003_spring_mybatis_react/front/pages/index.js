import React, { useState, useEffect } from 'react';
import axios from 'axios';

// ✅ axios 기본 설정: 쿠키 포함
axios.defaults.withCredentials = true;

const Index = () => {
    const [form, setForm] = useState({ username: '', password: '' });
    const [info, setInfo] = useState(null);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/api/member/login', form);
            console.log('✅ 로그인 응답:', res.data);

            setMessage(res.data.message || '✅ 로그인 성공!');

            // 쿠키로 로그인되었으므로 별도 토큰 저장 불필요
            await fetchMyInfo();
        } catch (err) {
            console.error('❌ 로그인 오류:', err.response?.data || err.message);
            const msg = err.response?.data?.error || '로그인 실패';
            setMessage(`❌ ${msg}`);
            setInfo(null);
        }
    };

    const fetchMyInfo = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/member/me');
            setInfo(res.data);
        } catch (err) {
            console.error('❌ 사용자 정보 조회 실패:', err);
            setMessage('❌ 인증 정보가 없습니다.');
        }
    };

    // 페이지 로드시 쿠키 인증 시도
    useEffect(() => {
        fetchMyInfo();
    }, []);

    return (
        <div style={{ padding: '2rem' }}>
            <h2>🔐 JWT 쿠키 기반 로그인 테스트</h2>

            {!info && (
                <form onSubmit={handleLogin}>
                    <input
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        placeholder="아이디"
                    />
                    <br />
                    <input
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="비밀번호"
                    />
                    <br />
                    <button type="submit">로그인</button>
                </form>
            )}

            <div style={{ marginTop: '1rem', color: message.includes('✅') ? 'green' : 'red' }}>
                {message}
            </div>

            {info && (
                <div style={{ marginTop: '2rem' }}>
                    <h3>✅ 마이페이지</h3>
                    <p>👤 아이디: {info.username}</p>
                    <p>📧 이메일: {info.email}</p>
                    <p>🌟 닉네임: {info.nickname}</p>
                    <p>🛡️ 권한: {info.role}</p>
                </div>
            )}
        </div>
    );
};

export default Index;
