import React, { useState } from 'react'
import './pagination.css';
const Pagination = ({ state, updateState }) => {
    const [pages, setPages] = useState([]);
    const maxDisplayed = 5;
    const updatePage = (page) => {
        updateState({ action: "page", page: page });
    }
    React.useEffect(() => {
        let startPg = Math.max(state.page - Math.floor(maxDisplayed / 2), 1);
        let endPg = startPg + maxDisplayed - 1;
        let maxEnd = Math.ceil(state.entries.length / state.perpage);
        if (endPg > maxEnd) {
            startPg = (maxEnd - maxDisplayed + 1 > 1) ? maxEnd - maxDisplayed + 1 : 1;
            endPg = maxEnd;
        };
        let pges = [];
        for (let i = startPg; i <= Math.ceil(endPg); i++) {
            pges.push(i);
        };
        setPages(pges);
    }, [state]);
    return (
        <nav className="pagination">
            {pages.map((p, i) =>
                <div
                    className={'page_item' + (p === state.page ? ' page_item_selected' : '')}
                    key={p}
                    onClick={() => { updatePage(p) }}
                >
                    {p}
                </div>
            )}
        </nav>
    )
}

export default Pagination