import axios from "axios";

class GetCrimes {
    getCrimes = () => {
        return axios.get("https://know-your-seattle-backend.herokuapp.com/api/crimes/getBlocks");
    }
}

export default new GetCrimes;