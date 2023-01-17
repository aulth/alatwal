import ImageKit from "imagekit";
const imagekit = new ImageKit({
    urlEndpoint: "https://ik.imagekit.io/lgju5gzfspd/",
    publicKey: "public_92LmaGdulaemcYl7X2YaL95QGnU=",
    privateKey: "private_SRA0c6B+yObu0UX6VCCiIEYhwEI=",
});

const getImageKit = async (req, res) => {
    var result = imagekit.getAuthenticationParameters();
    res.status(200).json(result);
}

export default getImageKit;