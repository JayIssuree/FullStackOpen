const Message = ({message, colour}) => {

    const css = {
        color: `${colour}`,
        background: "lightgrey",
        fontSize: 20,
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
      }

    if(message !== undefined){
        return(
            <h1 style={css}>
                {message}
            </h1>
        )
    }

}

export default Message