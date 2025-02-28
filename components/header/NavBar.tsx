
import HomepageLogo from "./HomepageLogo";
import MenuBar from "./MenuBar";
import SearchBar from "./SearchBar";


export default function NavBar() {
  return (
    <nav className="fixed top-0 w-full flex items-center justify-center space-x-44 py-4 px-10 text-center bg-gray-100 z-50">
      <HomepageLogo />
      <SearchBar />
      <MenuBar />
    </nav>
  );
}