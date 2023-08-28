import axios from "axios";

class PropGPTApi {
  private readonly BASE_URL = "https://www.propgpt.com/query/";

  public constructor(private readonly token: string) {
    this.token = token;
  }

  private headers() {
    return {
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
    };
  }

  async queryByString(query: string) {
    if (!query || query.trim() === "") {
      throw new Error("Query string cannot be empty");
    }

    const url = new URL(`${this.BASE_URL}?query=${encodeURIComponent(query)}`);
    let config = {
      method: "get",
      url: url.toString(),
      ...this.headers(),
      data: {
        token: this.token,
      },
    };

    return (await axios.request(config)).data;
  }
}

export const createPropGPTApi = () => {
  const token =
    process.env.NEXT_PROP_GPT_TOKEN ||
    "03ADUVZwDu357BTmz64beOVI8XqFYqdVZ8PFvlyvqopSnsl4Ssz6VdRQ0QNJPZPWNl9xgMrfh3csJN98A7L83zWyxHkFZ4cU_vIs-0NUn4IwWK518ztB_jrpz--p9KqCaxMMDX2YHAOfgk_cpLNaqhZu-O29AIchzxcTkpRg5UxaT75wL7dWlojORxtyEp6n6cfCzzMrzMpXLnihHj9pCjWe_MJy2vKanBF71GPUyHeObQEuy-NtJ7i8Q7PBTbOcG5QCmL5LonmDChPbCumy8AB5MMnaqxne0y7uXZ8rqzVqFfsObxgljX7zyrcr2CkIO4K5tEHNZqEc86A6BUdw7J9RhDYF45EW_git9paNf7lNGQk8m_DBb-EliT_frMwEFDGH9LstDAEO3bPoDofnx3HKnvVfNG4Y7GKPFb0_zpHFD3UhJ7INvtYlndQXr7Ig8E6Lo-0spQrOMc55hHmkqX4O2ddLaEJCf06Rnx2HoGVSP24AqnHgHJnk4LQkiK6K601G52hx-tqrg4blfaa5-kYp_H_VzF3S927OcDzCN_x9rCOPU1sF7MMMilCZ2_8bUbvQfOywZGCZ4IWP9u4eR2xUwnnditk-vY3uyqW-L3LSCRxo6bJOkClKbrE507--7OgKPUeLCEFsEZa4IA_Xa2O0_sQeRBJIPINHUNhDkQosafnDWkK6PFfVO9taI2fE0YqCK3wJEpVNcIURnVVAWDfiwP3bGvb7TRCVeXg69PKPl8mf7z_OP1WRMWrv6v8t5HWGuxwm-0_dEi4NftDJYOeZJbajVcKOg3biSryG_yLNYjEax_dk-bwuOubMtGTklm1pUAg8QIyByJnQPLiA9W_E2aP20j7w6C7EcbTq8kF6xPnrmKDU0S0TPnNOdbqG2nqfZoQBIPXzNd3UHK5aCdq8BQGubFV5W7CWgBqmNx1CArOCxZ_ofCZIhi93PuJrcsX7emcrgcfpIOSlqvxDYLBd4jTuFsAbOYkNQUV0YER9b-_As5Tf6cCaR5PzJnNrI5w6jEosReRECrMbhukkLK28XATbVxdh4p3ctlT9BHMzg4Dwx5owTmQrU3Vaw5UuCaRZGx7_VLuRi-mbdYEg7NYbSCr0_QVL9xgDuoAaRTZBYUXT-i1dfeCRsqqsB6acDvxoP52OYvIEF4znS2E11kTZt6LVcsSfv9d2Gq0Xh2_FQM36Qd009jojDP_gDC2ClciZA2JmcM475kvC0Y9tgfqaYp7Z2bkpAevXV5f6jVEeK18rpt3aKTe9udQH-_1chKU4YEwtYnVXkCgHmCdGm0jO0mWSYaxRZNT-Rg1ZRMnoiB3Hp2_doqVUzfiZrR7-cE4wPyfHL6uxJbSpOU8_O-qL10NTaWE8t0qIIE1YGPzF9frTKWbMxxpGQbKGHmD9xjGOYbI3Qtj3JGGbNurQotccS-JNUxH-RVg_npKKd_ApK5aF5DzQfNIn2mJsYgFeE4PDaxCwTkSsye7Vst0p-wq6CvHIh1dM6EjNCflc0aZKc4vCMiE5_iK2HFW9eu9sewIOIV2EIU3Slr";
  if (!token) {
    throw new Error("No PROP_GPT_TOKEN found in .env");
  }
  return new PropGPTApi(token);
};
