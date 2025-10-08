import {FC, useEffect, useState} from "react";
import {Title} from "@telegram-apps/telegram-ui";
import styles from "./Header.module.css";
import {RiCloseCircleFill} from "react-icons/ri";
import {Menu} from "@/components/Menu/Menu.tsx";
import {Link} from "@/components/Link/Link.tsx";
import {classNames} from "@/css/classnames.ts";

export const Header: FC = () => {
	const [burger, setBurger] = useState(false);

	const handleClickOnDocument = (event: MouseEvent) => {
		if (document.getElementById("burger-toggler")?.contains(event.target as HTMLElement)) return;

		setBurger(false);
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOnDocument)

		return () => {
			document.removeEventListener('click', handleClickOnDocument);
		}
	}, []);

	const toggleBurger = () => setBurger(!burger);

	return (
		<header className={classNames(styles.header)}>
			<div className={styles.header_wrapper}>
				<Title level="1">
					<Link to="/">1G Company</Link>
				</Title>
				<div
					id="burger-toggler"
					className={[styles.header_toggler, burger && styles.header_toggler__active].join(' ')}
					onClick={toggleBurger}
				>
					<span></span>
					<span></span>
					<span></span>
				</div>
			</div>
			<div
				id="mobile-menu"
				className={[styles.mobile_menu, burger && styles.mobile_menu__opened].join(' ')}
			>
				<Title level="1" className={styles.mobile_menu__title}>
					<Link to="/">1G Company</Link>
				</Title>
				<RiCloseCircleFill className={styles.mobile_menu__closed} onClick={toggleBurger}
				                   fill="var(--tg-theme-accent-text-color)"/>
				<Menu/>
			</div>
		</header>
	)
}