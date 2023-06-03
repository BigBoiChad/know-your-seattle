import axios from "axios";

class GetCrimes {
    getCrimes = () => {
        return axios.get("http://localhost:5000/api/crimes/getBlocks");
    }
}

export default new GetCrimes;