const { Form, Input, Button } = antd;

const Login = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
    // Simulando login bem-sucedido
    if (values.username === 'admin' && values.password === 'admin') {
      window.location.href = 'menu.html';
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    React.createElement('div', { style: { width: '300px', margin: '100px auto' } },
      React.createElement('h2', null, 'Login'),
      React.createElement(Form, { name: 'login', initialValues: { remember: true }, onFinish: onFinish },
        React.createElement(Form.Item, { name: 'username', rules: [{ required: true, message: 'Please input your Username!' }] },
          React.createElement(Input, { placeholder: 'Username' })
        ),
        React.createElement(Form.Item, { name: 'password', rules: [{ required: true, message: 'Please input your Password!' }] },
          React.createElement(Input.Password, { placeholder: 'Password' })
        ),
        React.createElement(Form.Item, null,
          React.createElement(Button, { type: 'primary', htmlType: 'submit', style: { width: '100%' } }, 'Login')
        )
      )
    )
  );
};

ReactDOM.render(React.createElement(Login), document.getElementById('login-container'));
