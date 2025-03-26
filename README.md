# 💊 Creatine Reminder

Um app simples e direto feito com **React Native + Expo**, pra te lembrar de tomar creatina todo santo dia — e acompanhar seu streak como um verdadeiro monstro da disciplina.

![Badge](https://img.shields.io/badge/feito_com-React_Native-blue.svg)
![Badge](https://img.shields.io/badge/expo-%5E48.0.18-lightgrey)

---

## 📱 Funcionalidades

- ✅ Marca se você tomou ou não creatina no dia
- 📅 Visualiza no calendário os dias marcados
- 🔔 Recebe notificações a cada 2h entre 6h e 00h se esquecer de tomar
- 🔒 Tudo salvo localmente com SQLite
- 🔥 Mostra quantos dias seguidos você não falha

---

## 🖼️ Preview

(em breve, print da tela principal)

---

## 🚀 Como rodar o projeto

1. Clone o repositório:

```bash
git clone https://github.com/LucasJandrey5/CreatineReminder.git
cd creatina-tracker
```

2. Instale as dependências:

```bash
npm install
```

3. Rode o app:

```bash
npm start
```

⚠️ Para testar as notificações agendadas, é necessário gerar um .apk com EAS Build — o Expo Go não suporta notificações locais agendadas.

## 🧱 Tecnologias

- [React Native](https://reactnative.dev/) — Framework para desenvolvimento mobile cross-platform
- [Expo](https://expo.dev/) — Plataforma para build e execução de apps React Native com facilidade
- [expo-sqlite](https://docs.expo.dev/versions/latest/sdk/sqlite/) — Armazenamento local usando SQLite
- [react-native-calendars](https://github.com/wix/react-native-calendars) — Componente de calendário personalizável
- [expo-notifications](https://docs.expo.dev/versions/latest/sdk/notifications/) — Envio de notificações locais agendadas

## 💡 Ideias Futuras

- 📊 Tela de estatísticas semanais e mensais
- 📱 Widget Android com o streak atual
- 🌙 Dark mode
- 🎯 Recompensas por streaks longos (gamificação)
- 🤝 Integração com Apple Health e Google Fit
- 🔗 Backup e sincronização via conta

## 🤝 Contribuindo

Contribuições são muito bem-vindas!

Sinta-se à vontade pra:

- Abrir **issues** com bugs ou sugestões
- Criar **pull requests** com melhorias ou novas features
- Discutir ideias novas via **Discussions** ou nas issues

Só mantenha o foco no propósito do app: **simples, direto e funcional**.
