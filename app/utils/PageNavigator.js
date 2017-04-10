/**
 * Created by Medivh on 2017/3/21.
 */
export  default  function getPageNavigator(beginPageNo, endPageNo, currentPageNo,url) {
    let  pageNavigator = document.createElement("nav");
    pageNavigator.setAttribute("class","page-navigator");

    if(beginPageNo < 1 || endPageNo < 1 || currentPageNo < 1 ||endPageNo < beginPageNo || currentPageNo < beginPageNo || currentPageNo > endPageNo ) {
        return pageNavigator;
    }
	
	if(currentPageNo === endPageNo && currentPageNo === beginPageNo) {
		return pageNavigator;
	}


    if((currentPageNo - 1) >= beginPageNo) {
        let node = getExtendPreEle(url, currentPageNo - 1);
        pageNavigator.appendChild(node)
    }

    if(currentPageNo === beginPageNo) {
        let node = getPageNumberCurrentEle(currentPageNo);
        pageNavigator.appendChild(node);
    }

    if(currentPageNo != beginPageNo) {
        let node = getPageNumberEle(url, beginPageNo);
        pageNavigator.appendChild(node);
    }

    if((currentPageNo - 2) === beginPageNo ) {
        let node = getPageNumberEle(url, currentPageNo - 1);
        pageNavigator.appendChild(node);
    }

    if((currentPageNo - 2) > beginPageNo) {
        let span = document.createElement("span");
        span.setAttribute("class", "space");
        span.innerHTML = "...";
        pageNavigator.appendChild(span);
        let node = getPageNumberEle(url, currentPageNo - 1);
        pageNavigator.appendChild(node);
    }

    if(currentPageNo != beginPageNo && currentPageNo != endPageNo) {
        let node = getPageNumberCurrentEle(currentPageNo);
        pageNavigator.appendChild(node);
    }

    if((currentPageNo+2) === endPageNo) {
        let node = getPageNumberEle(url, currentPageNo+1);
        pageNavigator.appendChild(node);
    }

    if(endPageNo > (currentPageNo+2)) {
        let node = getPageNumberEle(url, currentPageNo+1);
        pageNavigator.appendChild(node);
        let span = document.createElement("span");
        span.setAttribute("class", "space");
        span.innerHTML = "...";
        pageNavigator.appendChild(span);
    }

    if(currentPageNo === endPageNo) {
        let node = getPageNumberCurrentEle(endPageNo);
        pageNavigator.appendChild(node);
    }

    if(currentPageNo != endPageNo) {
        let node = getPageNumberEle(url,endPageNo);
        pageNavigator.appendChild(node);
    }

    if((currentPageNo+1) <= endPageNo) {
        let node = getExtendNextEle(url, currentPageNo+1);
        pageNavigator.appendChild(node);
    }

    return pageNavigator;
}

function getExtendPreEle(url, pageNo) {
    let node = document.createElement("a");
    node.setAttribute("class", "extend prev");
    node.setAttribute("rel", "prev");
    node.setAttribute("href", url + pageNo);
    node.innerHTML = "上一页";
    return node;
}

function getExtendNextEle(url, pageNo) {
    let node = document.createElement("a");
    node.setAttribute("class", "extend next");
    node.setAttribute("rel", "next");
    node.setAttribute("href", url+pageNo);
    node.innerHTML = "下一页";
    return node;
}

function getPageNumberCurrentEle(pageNo) {
    let node = document.createElement("span");
    node.setAttribute("class", "page-number current");
    node.innerHTML = pageNo;
    return node;
}

function getPageNumberEle(url,pageNo) {
    let link = url + pageNo;
    let node = document.createElement("a");
    node.setAttribute("class", "page-number");
    node.setAttribute("href", link);
    node.innerHTML = pageNo;
    return node;
}