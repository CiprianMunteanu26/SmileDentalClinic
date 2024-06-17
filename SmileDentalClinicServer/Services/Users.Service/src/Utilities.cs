using System;
using System.IO;

namespace Users.Service.src
{
    public static class Utilities
    {
        public static string GetImageExtension(string blobData)
        {

            string mimeType = blobData.Substring(5, blobData.IndexOf(';') - 5);
            string[] parts = mimeType.Split('/');
            string fileType = parts.Length == 2 ? parts[1] : string.Empty;
            switch (fileType)
            {
                case "jpeg":
                    return ".jpg";
                case "png":
                    return ".png";
                case "gif":
                    return ".gif";
                default:
                    throw new Exception("Unsupported image format.");
            }
        }

        public static bool SaveImage(byte[] imageData, string targetFolder)
        {
            try
            {
                if (Directory.Exists(targetFolder))
                {
                    Console.WriteLine("Folderul exista");
                    Directory.CreateDirectory(targetFolder);
                }

                File.WriteAllBytes(targetFolder, imageData);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}