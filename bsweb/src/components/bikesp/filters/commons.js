const getValueList = (value) => {
    const list =  value.value.map(obj => obj.value)
    if (list.length > 0) {
        return list
    }

    return undefined
}

export { getValueList }