// Organization Folder
// ディレクトリでは /(auth)/login
// だが、Next.js app router では () をつけた ディレクトリは無視されるので実際のパスは /login

// そのまま /login フォルダを作れば良いように思えるが、 Organization Folder を使うと layout.tsx などが共通化できる

const LoginPage = () => {
	return <div>Login</div>;
};

export default LoginPage;
