import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import DB from "../db/DB";
export async function pedirPermissaoNotificacao() {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") {
    alert("Permissão de notificação negada!");
  }
}

export async function agendarNotificacoes() {
  if (!Device.isDevice) {
    return;
  }

  const day = new Date();

  if (await DB.checkDay(new Date().toISOString().split("T")[0])) {
    day.setDate(day.getDate() + 1);
  }

  await cancelAllNotifications(); // garante que não tem notificações duplicadas

  const notificacoes = [];
  const hoje = new Date(day.getFullYear(), day.getMonth(), day.getDate());

  for (let hora = 7; hora <= 24; hora += 2) {
    const dataNotificacao = new Date(hoje);
    dataNotificacao.setHours(hora, 0, 0);

    if (dataNotificacao > new Date()) {
      const id = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Creatina 💊",
          body: "Você ainda não tomou a creatina hoje!",
          sound: true,
        },
        trigger: { date: dataNotificacao, channelId: "default" },
      });

      notificacoes.push(id);
    }
  }

  console.log("notificacoes: ", notificacoes);

  // Salva os IDs para cancelar depois
  await Notifications.setNotificationChannelAsync("default", {
    name: "default",
    importance: Notifications.AndroidImportance.HIGH,
  });

  await Notifications.cancelAllScheduledNotificationsAsync(); // remove duplicadas velhas
  await Notifications.scheduleNotificationAsync({
    content: { title: "Notificações reprogramadas!" },
    trigger: null, // dispara imediatamente só como debug
  });
}

export async function cancelAllNotifications() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}
