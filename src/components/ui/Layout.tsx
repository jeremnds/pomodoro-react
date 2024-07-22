type LayoutProps = { children: React.ReactNode };

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="bg-slate-400 h-dvh">
      <div className="max-w-xl px-4 py-6 m-auto font-sans text-white ">
        {children}
      </div>
    </div>
  );
};

export default Layout;
