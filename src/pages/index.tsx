import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import * as SQLite from "expo-sqlite";
import DB from "../db/DB";
import { useState, useEffect } from "react";
import {
  agendarNotificacoes,
  cancelAllNotifications,
} from "../utils/notifications";
import { Calendar } from "react-native-calendars";

export default function Index() {
  const [day, setDay] = useState<boolean>(false);
  const [calendarData, setCalendarData] = useState<any>({});
  const [currentStreak, setCurrentStreak] = useState<number>(0);

  useEffect(() => {
    checkDay();
    loadCalendar();
    calculateCurrentStreak();
  }, []);

  const checkDay = async () => {
    const day = await DB.checkDay(new Date().toISOString().split("T")[0]);
    setDay(day);
    loadCalendar();
    calculateCurrentStreak();
  };

  const marcarDia = async (took: boolean) => {
    await DB.marcarDia(took);
    setDay(took);
    checkDay();

    await cancelAllNotifications();

    // Agendar notificações para o dia seguinte
    await agendarNotificacoes();
  };

  const loadCalendar = async () => {
    const calendar = await DB.loadCalendar();

    const calendarData: any = {};
    calendar.forEach((item: any, index: number) => {
      calendarData[item.date] = {
        marked: item.took ? true : false,
        selectedColor: "blue",
      };
    });

    setCalendarData(calendarData);
  };

  const calculateCurrentStreak = async () => {
    const streak = await DB.calculateCurrentStreak();
    setCurrentStreak(streak);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.dateText}>
          Hoje: {new Date().toISOString().split("T")[0]}
        </Text>
      </View>

      <Calendar
        style={styles.calendar}
        markedType={"dot"}
        markedDates={{
          ...calendarData,
        }}
        theme={{
          selectedDayBackgroundColor: "#4A90E2",
          todayTextColor: "#4A90E2",
          dotColor: "#4A90E2",
        }}
      />

      <View style={styles.statusContainer}>
        <Text
          style={[
            styles.statusText,
            day ? styles.statusTaken : styles.statusNotTaken,
          ]}
        >
          {day ? "✅ Creatina tomada hoje!" : "❌ Creatina não tomada hoje"}
        </Text>

        <Text style={styles.streakText}>
          🔥 Sequência atual: {currentStreak} dias
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.buttonTake]}
          onPress={() => marcarDia(true)}
        >
          <Text style={styles.buttonText}>Marcar como tomado</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonSkip]}
          onPress={() => marcarDia(false)}
        >
          <Text style={styles.buttonText}>Marcar como não tomado</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
    padding: 16,
  },
  header: {
    marginBottom: 20,
    alignItems: "center",
  },
  dateText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2D3436",
  },
  calendar: {
    borderRadius: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: "white",
    marginBottom: 20,
  },
  statusContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  statusText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  statusTaken: {
    color: "#27AE60",
  },
  statusNotTaken: {
    color: "#E74C3C",
  },
  streakText: {
    fontSize: 16,
    color: "#2D3436",
    fontWeight: "500",
  },
  buttonContainer: {
    gap: 12,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  buttonTake: {
    backgroundColor: "#4A90E2",
  },
  buttonSkip: {
    backgroundColor: "#95A5A6",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
