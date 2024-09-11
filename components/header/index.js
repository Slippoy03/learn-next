import Link from "next/link";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useMutation } from "@useMutation/hooks/useMutation";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";

import styles from "./styles.module.css";

export default function Header() {
  const userData = useContext(UserContext);
  const router = useRouter();
  const { mutate } = useMutation();

  const HandleLogout = async () => {
    const response = await mutate({
      url: "https://service.pace-unv.cloud/api/logout",
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("user_token")}`,
      },
    });

    if (!response?.success) {
      console.log("Failed to log out");
    } else {
      Cookies.remove("user_token");
      router.push("/login");
    }
  };

  return (
    <div className={styles.header}>
      <ul className="list-disc pl-5">
        <li>
          <Link href="/" className="underline">
            Home
          </Link>
        </li>
        <li>
          <Link href="/users" className="underline">
            Users
          </Link>
        </li>
        <li>
          <Link href="/users/detail" className="underline">
            Detail
          </Link>
        </li>
        <li>
          <Link href="/profile" className="underline">
            Profile
          </Link>
        </li>
        <li>
          <Link href="/notes" className="underline">
            Notes
          </Link>
        </li>
        <li>
          <Link href="/posts" className="underline">
            Posts
          </Link>
        </li>
        <li>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              {userData?.name}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={HandleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </li>
      </ul>
    </div>
  );
}
