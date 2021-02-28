import React, { useState } from 'react';
import { Card, Form, Button, Input, notification } from 'antd';
import { SmileOutlined, FrownOutlined } from '@ant-design/icons';
import { axiosInstance } from 'api';
import { useHistory, useLocation } from 'react-router-dom';
import { useAppContext, setToken } from 'store';
import { parseErrorMessages } from 'utils/forms';

export default function Login() {
    const { dispatch } = useAppContext(); 
    const history = useHistory();
    const location = useLocation();
    const [fieldErrors, setFieldErrors] = useState({});

    const onFinish = values => {
        async function fn() {
            const { username, password } = values;
            const data = { username, password };
            const { from: loginRedirectUrl } = location.state || {from: { pathname: "/" }};
            setFieldErrors({});

            try {
                const response = await axiosInstance.post("/accounts/token/", data);
                const { data: {token: jwtToken} } = response; // response 내부에 토큰이 담겨있다.
                
                dispatch(setToken(jwtToken));
                
                notification.open({
                    message: "로그인 성공",
                    icon: <SmileOutlined style={{ color: "#108ee9" }} />
                });
                history.push(loginRedirectUrl); 
            }
            catch(error) {
                notification.open({
                    message: "로그인 실패",
                    description: "아이디/암호를 확인해주세요.",
                    icon: <FrownOutlined style={{ color: "#ff3333" }} />
                });


                if (error.response) {
                    const { data: fieldsErrorMessages } = error.response;
                    setFieldErrors(parseErrorMessages(fieldsErrorMessages));
                }
            }
        }
        fn();
    }

    return (
        <Card title="로그인">
            <Form
                {...layout}
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                    hasFeedback
                    {...fieldErrors.username}
                    >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    {...fieldErrors.password}
                    >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        </Card>
    );
}

const layout = {
    labelCol: {span: 8,},
    wrapperCol: {span: 16,},
  };
  const tailLayout = {
    wrapperCol: {offset: 8, span: 16,},
  };