import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  const contacts = [
    {
      href: "https://github.com/JonashGania",
      icon: <FaGithub style={{ color: "white", fontSize: "1.2rem" }} />,
    },
    {
      href: "https://www.facebook.com/jonashgania/",
      icon: <FaFacebook style={{ color: "white", fontSize: "1.2rem" }} />,
    },
    {
      href: "https://www.linkedin.com/in/jonash-gaña-74b1a12a7/",
      icon: <FaLinkedin style={{ color: "white", fontSize: "1.2rem" }} />,
    },
  ];
  return (
    <footer className="max-w-[1200px] w-full min-h-[100px] mx-auto py-4 mt-16 border-t border-t-zinc-700">
      <div className=" flex items-start">
        <div className="flex flex-1 flex-col gap-2">
          <h1 className="text-white font-bold text-xl">Wrappify</h1>
          <p className="text-gray-200 text-sm max-w-[300px]">
            Check your Spotify data including your Tracks, Artists, Genres and
            Playlists.
          </p>
        </div>
        <div className="flex-1 flex justify-end">
          <div className="flex flex-col gap-2 items-center">
            <span className="text-zinc-400 font-semibold">Connect</span>
            <div className="flex gap-2">
              {contacts.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  target="_blank"
                  className="px-2 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="pt-4">
        <p className="text-gray-300 text-sm text-center">
          Developed by Jonash Gaña
        </p>
        <p className="text-gray-300 text-sm text-center">
          &copy; Copyright 2025, All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
