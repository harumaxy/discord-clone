interface Props {
	children: React.ReactNode;
}

const AuthLayout = ({ children }: Props) => {
	return <div className="bg-red-500 h-full">{children}</div>;
};

export default AuthLayout;
