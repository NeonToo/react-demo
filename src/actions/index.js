/**
 * Created by I326950 on 6/28/2017.
 */
export function changeLoadingStatus(isLoading) {
    return {
        type: "IS_LOADING",
        isLoading
    }
}