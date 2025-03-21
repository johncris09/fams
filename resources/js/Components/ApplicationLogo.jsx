import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Logo from '@/image/logo.png'

export default function ApplicationLogo(props) {
  return (
    <>
      <h2>Oroquieta City</h2>
      <Avatar>
        <AvatarImage src={Logo} width={90} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </>
  );
}
