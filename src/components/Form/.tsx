


if (type === "multi-page") {
    const [currentPage, setCurrentPage] = useState(0);
    const pages = Children.toArray(children);
    function nextPage() {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    }
    function previousPage() {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    }
    function BackButton() {
        if (currentPage > 0) {
            return <Button type="button" className="app-form-back-button" icon={["arrow-left", 20]} label="Back" onClick={previousPage} disabled={currentPage === 0} />;
        } else {
            return null;
        }
    }
    function NextButton() {
        if (currentPage < pages.length - 1) {
            const currentInputs = Children.toArray(pages[currentPage]?.props?.children.filter((child): child is ReactElement => {
                return isValidElement(child) && child.type === "input";
            }));
            let containsRequiredInput = false
            for (let i = 0; i < currentInputs.length; i++) {
                const input = currentInputs[i];
                if (input.props.required === true) {
                    containsRequiredInput = true;
                    break;
                }
            }
            if (containsRequiredInput === false) {
                return <Button type="button" className="app-form-next-button" icon={["arrow-right", 20]} label="Skip" onClick={nextPage} />;
            } else {
                return <Button type="button" className="app-form-next-button" icon={["arrow-right", 20]} label="Next" onClick={nextPage} />;
            }
        } else {
            return <Button type="submit" className="app-form-next-button" label={submit ? submit[1] : undefined} icon={submit ? submit[0] : undefined} />;
        }
    }
    return (
        <form className={classNames} action={action} method={method}>
            {pages.map((page, index) => {
                if (isValidElement(page)) {
                    return React.cloneElement(page, {
                        style: {
                            display: index === currentPage ? "flex" : "none"
                        }
                    } as any);
                }
                return page;
            })}
            <BackButton />
            <NextButton />
        </form>
    );