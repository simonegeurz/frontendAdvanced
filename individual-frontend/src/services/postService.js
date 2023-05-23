import http from "./commonUrl";


const postService = () => {

    const BaseUri = "/api/Post/2";


  async function getPosts() {
    console.log("in service")
    console.log(http.get(BaseUri))
    return http.get(BaseUri);
  }

  return { getPosts };
};

export default postService;
