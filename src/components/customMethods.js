export const removeElement=(arr, value)=> {

    return arr.filter((ele) => {
        // return ele.path != value;
        return !!ele.path.localeCompare(value);
    });
}