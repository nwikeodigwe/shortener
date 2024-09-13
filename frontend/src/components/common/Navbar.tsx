const NavBar = () => {
  return (
    <>
      <header className="fixed top-0 left-0 flex items-center justify-between px-6 py-7 w-full">
        <div>
          <h2 className="text-2xl font-semibold uppercase">ShortUrl</h2>
        </div>
        <div className="flex gap-2"></div>
      </header>
    </>
  );
};

export default NavBar;
