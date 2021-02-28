import React, { useState } from 'react';
import { Form, Button, Input, notification } from 'antd';
import { SmileOutlined, FrownOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { axiosInstance, useAxios } from 'api';

export default function Signup() {
    const history = useHistory();
    const [fieldErrors, setFieldErrors] = useState({});
    
    const onFinish = (values) => {
        async function fn() {
            const { username, password } = values;
            const data = { username, password };

            setFieldErrors({});

            try {
                await axiosInstance.post("/accounts/signup/", data);
                
                notification.open({
                    message: "회원가입 성공",
                    description: "로그인 페이지로 이동합니다.",
                    icon: <SmileOutlined style={{ color: "#108ee9" }} />
                });

                history.push("/accounts/login");
            }
            catch(error) {
                notification.open({
                    message: "회원가입 실패",
                    description: "아이디/암호를 확인해주세요.",
                    icon: <FrownOutlined style={{ color: "#ff3333" }} />
                });


                if (error.response) {
                    const { data: fieldsErrorMessages } = error.response;

                    setFieldErrors(
                        Object.entries(fieldsErrorMessages).reduce((acc, [fieldName, errors]) => {
                            acc[fieldName] = {
                                validateStatus: "error",
                                help: errors.join(" ")
                            };
                            return acc;
                        }, {})
                    );
                }
            }
        }
        fn();
    };

    return (
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
    );
}

const layout = {
    labelCol: {span: 8,},
    wrapperCol: {span: 16,},
  };
  const tailLayout = {
    wrapperCol: {offset: 8, span: 16,},
  };