const xhr = async ({ action, handleAction, eventContextHierarchy, ...otherParameters }) => {
    const { url, method, data, onSuccess, onError, onFinish } = action;
    function handleSuccess(parsedResponse) {
        if (!onSuccess)
            return;
        handleAction({
            action: onSuccess,
            eventContextHierarchy: [{ id: 'onSuccess', value: parsedResponse }, ...eventContextHierarchy],
            handleAction,
            ...otherParameters,
        });
    }
    function handleError(error) {
        if (!onError)
            return;
        handleAction({
            action: onError,
            eventContextHierarchy: [{ id: 'onError', value: error }, ...eventContextHierarchy],
            handleAction,
            ...otherParameters,
        });
    }
    function handleFinish() {
        if (!onFinish)
            return;
        handleAction({
            action: onFinish,
            eventContextHierarchy,
            handleAction,
            ...otherParameters,
        });
    }
    try {
        const response = await fetch(url, { method, body: JSON.stringify(data) });
        if (response.status >= 400)
            throw response;
        const resultText = await response.text();
        const resultData = resultText && JSON.parse(resultText);
        handleSuccess({
            data: resultData,
            status: response.status,
            statusText: response.statusText,
        });
    }
    catch (error) {
        console.error(error);
        handleError(error);
    }
    finally {
        handleFinish();
    }
};
export default xhr;
//# sourceMappingURL=xhr.js.map