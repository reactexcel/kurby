import {
    atom,
} from "recoil";


/**
 * Filter Contect
 * @description: Global state management system
 * @see https://recoiljs.org/
*/

//TODO we can remove radius once we are sure we aren't using it anymore
interface SnackbarContext {
    key: string, 
    default: {
        message: string | null,
        variant: 'success' | 'error' | null,
        open: boolean
    }
}

const snackbarContext: SnackbarContext  = {
    key: 'snackbarContext', // unique ID (with respect to other atoms/selectors)
    default: {
        message: '',
        variant: null,
        open: false
    }, // default value (aka initial value)
  }

export default atom(snackbarContext);
