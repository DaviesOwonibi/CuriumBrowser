import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faMagnifyingGlass,
	faArrowLeft,
	faArrowRight,
	faArrowRotateRight,
} from '@fortawesome/free-solid-svg-icons';
import TabGroup from './TabGroup';
import { log } from 'util';

function NavBar() {
	const searchInputRef = useRef(null);
	const webviewRef = useRef(null);
	const reloadBtnRef = useRef(null);
	const [currentPage, setCurrentPage] = useState('https://www.google.com/');

	useEffect(() => {
		if (webviewRef) {
			let webview = document.querySelector('webview');
			webview.addEventListener('keydown', detectKeyDown);
		}
	}, []);

	const detectKeyDown = (e) => {
		console.log('Clicked key: ', e.key);
	};

	function isValidURL(url: string) {
		const urlPattern =
			/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g;
		return urlPattern.test(url);
	}

	function isLocalhostUrl(url: string) {
		const urlPattern = /^http:\/\/\w+(\.\w+)*(:[0-9]+)?\/?$/;
		return urlPattern.test(url);
	}

	function handleWebviewError() {
		console.error('Webview Error: ', event);
	}

	const performSearch = () => {
		if (searchInputRef.current && webviewRef.current) {
			const searchTerm = searchInputRef.current.value.trim();

			if (searchTerm !== '') {
				webviewRef.current.openDevTools();
				if (isValidURL(searchTerm)) {
					if (searchTerm.startsWith('https://')) {
						const searchUrl = searchTerm;
						webviewRef.current.src = searchTerm;
						searchInputRef.current.value = searchTerm;
					} else {
						const searchUrl = `https://${searchTerm}`;
						webviewRef.current.src = searchUrl;
						searchInputRef.current.value = searchUrl;
					}
				} else {
					if (isLocalhostUrl(searchTerm)) {
						webviewRef.current.src = searchTerm;
						searchInputRef.current.value = searchTerm;
					} else {
						const searchUrl = `https://google.com/search?q=${encodeURIComponent(
							searchTerm,
						)}`;
						webviewRef.current.src = searchUrl;
						searchInputRef.current.value = searchUrl;
					}
				}
				setCurrentPage(webviewRef.current.src);
			}
		}
	};

	const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			performSearch();
		}
	};

	const handleGoBack = () => {
		if (webviewRef.current) {
			webviewRef.current.goBack();
			setCurrentPage(webviewRef.current.src);
		}
	};

	const handleGoForward = () => {
		if (webviewRef.current) {
			webviewRef.current.goForward();
			setCurrentPage(webviewRef.current.src);
		}
	};

	const handleReload = () => {
		if (webviewRef.current) {
			reloadBtnRef.current.style.animation = 'rotate .5s linear';
			webviewRef.current.reload();
			setTimeout(() => {
				reloadBtnRef.current.style.animation = '';
			}, 500);
		}
	};

	return (
		<>
			<TabGroup currentPage={currentPage} />
			<div className="navbar">
				<div className="controlButtons">
					<button type="button" onClick={handleGoBack}>
						<FontAwesomeIcon icon={faArrowLeft} />
					</button>
					<button type="button" onClick={handleGoForward}>
						<FontAwesomeIcon icon={faArrowRight} />
					</button>
					<button type="button" ref={reloadBtnRef} onClick={handleReload}>
						<FontAwesomeIcon icon={faArrowRotateRight} />
					</button>
				</div>
				<div className="addressBar">
					<FontAwesomeIcon icon={faMagnifyingGlass} />
					<div className="search">
						<input
							ref={searchInputRef}
							type="text"
							className="searchTerm"
							placeholder="Search Google or type a URL"
							onKeyUp={handleKeyUp}
						/>
					</div>
				</div>
			</div>
			<webview
				ref={webviewRef}
				onError={handleWebviewError}
				src={currentPage}
			/>
		</>
	);
}

export default NavBar;
