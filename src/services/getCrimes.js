import axios from "axios";

class GetCrimes {
    getCrimes = () => {
        return axios.get("https://seattle-backend-8ceec4513b83.herokuapp.com/api/crimes/getBlocks");
    }
}

export default new GetCrimes;
