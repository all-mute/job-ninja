import { promises as fs } from "fs";
import path from "path";

const avatarsDir = "src/lib/assets/public/avatars";

// Функция для получения списка файлов в директории
async function getFilesFromDir(dirPath) {
  const files = await fs.readdir(dirPath);
  return files.filter(file => !file.startsWith(".")); // Исключаем скрытые файлы
}

// Функция для определения типа контента по расширению файла
function getContentType(fileName) {
  const extension = path.extname(fileName).toLowerCase();
  switch (extension) {
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".svg":
      return "image/svg+xml";
    case ".gif":
      return "image/gif";
    default:
      return "application/octet-stream"; // Общий тип для неизвестных файлов
  }
}

export async function GET() {
  // Получаем список файлов аватарок
  const avatarFiles = await getFilesFromDir(avatarsDir);

  // Выбираем случайный файл
  const randomIndex = Math.floor(Math.random() * avatarFiles.length);
  const randomFileName = avatarFiles[randomIndex];

  // Читаем файл и определяем тип контента
  const asset = await fs.readFile(path.join(avatarsDir, randomFileName));
  const contentType = getContentType(randomFileName);

  return new Response(asset, {
    headers: {
      "Content-Type": contentType
    }
  });
}
