const Header = ({ headerText }: { headerText: string }) => {
  return (
    <header className="bg-white shadow-sm dark:bg-slate-600">
      <div className="mx-auto max-w-7xl py-4 px-4 sm:px-6 lg:px-8">
        <h1 className="text-lg font-semibold leading-6 text-gray-900 dark:text-slate-50">
          {headerText}
        </h1>
      </div>
    </header>
  );
};

export default Header;
