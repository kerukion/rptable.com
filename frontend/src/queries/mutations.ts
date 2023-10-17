import { GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import { QueryClient, useMutation } from "react-query";
import { db } from "~db";
import { APIService } from "~frontend/services";
import { CURRENT_USER } from "./keys";

export const useLoginMutation = (queryClient: QueryClient) => {
    return useMutation((googleData: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        if (!(googleData as GoogleLoginResponse).tokenId) {
            throw Error("offline");
        }
        return APIService.login((googleData as GoogleLoginResponse).tokenId)
    }, {
        onSuccess: (data: db.user.Schema) => {
            console.log(data);
            queryClient.setQueryData(CURRENT_USER, data);
        }
    });

}