import {FC, useEffect, useState} from "react";
import {Caption, Cell, List, Section, Title} from "@telegram-apps/telegram-ui";
import {routes} from "@/navigation/routes.tsx";
import {Link} from "@/components/Link/Link.tsx";
import {useLocation} from "react-router-dom";
import styles from "./Header.module.css";

export const Header: FC = () => {
	if (!routes) return (
		<header>
			<Caption>Not found routes</Caption>
		</header>
	);

	const [burger, setBurger] = useState(false);
	const location = useLocation();

	const handleClickOnDocument = (event: MouseEvent) => {
		if(document.getElementById("mobile-menu")?.contains(event.target as HTMLElement)) return;

		setBurger(false);
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOnDocument)

		return () => {
			document.removeEventListener('click', handleClickOnDocument);
		}
	}, []);

	return (
		<header>
			<div className={styles.header_wrapper}>
				<Title level="1">1G Company</Title>
				<div
					id="mobile-menu"
					className={[styles.header_toggler, burger && styles.header_toggler__active].join(' ')}
					onClick={() => setBurger(!burger)}
				>
					<span></span>
					<span></span>
					<span></span>
				</div>
			</div>
			<List className={[styles.mobile_menu, burger && styles.mobile_menu__opened].join(' ')}>
				<Section>
					{routes.map(({path, title}) => {
						if (path == '/') return;

						return (<Link key={path} to={path} className={`${path == location.pathname && styles.link_active}`}><Cell>{title}</Cell></Link>)
					})}
				</Section>
			</List>
		</header>
	)
}