import { useEffect } from "react";
import Index from "./src/pages/index";
import DB from "./src/db/DB";
import {
  pedirPermissaoNotificacao,
  agendarNotificacoes,
} from "./src/utils/notifications";
import { Platform, StatusBar } from "react-native";

export default function App() {
  useEffect(() => {
    DB.startDB();

    pedirPermissao();
  }, []);

  async function pedirPermissao() {
    await pedirPermissaoNotificacao();

    if (Platform.OS === "android") {
      await agendarNotificacoes();
    }
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F6FA" />
      <Index />
    </>
  );
}
