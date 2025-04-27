// socketManager.js
let io;

// Fonction pour initialiser Socket.io
exports.initialize = (socketIo) => {
  io = socketIo;
  console.log('Socket.io initialisé avec succès');
};

// Fonction pour récupérer l'instance Socket.io
exports.getIO = () => {
  if (!io) {
    throw new Error("Socket.io n'est pas initialisé");
  }
  return io;
};