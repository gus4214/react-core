interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <>
      <header id="header">{title}</header>
      <span>hello</span>
    </>
  );
};
export default Header;
