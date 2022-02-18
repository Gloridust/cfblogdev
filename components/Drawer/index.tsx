import React from "react";
import styled from "styled-components";
import { Headmaster, CardMenu } from "./utils";
import Language from "./Language";

const LoveIcon = styled.svg`
	display: inline-block;
	width: 0.944444rem;
	color: rgb(255, 85, 85);
	transform: translateY(10%);
`;

interface DrawerProps {
	config: any;
	lang: string;
}

interface DrawerState {
	copyrightFixed: boolean;
	drawerWidth: number;
	drawerLeft: number;
	copyrightTop: number;
}

/**
 * PC端右侧部公共菜单
 */

export default class extends React.Component<DrawerProps, DrawerState> {
	drawer: any;
	copyright: any;
	constructor(props: Readonly<DrawerProps>) {
		super(props);
		this.state = {
			copyrightFixed: false,
			drawerWidth: 296,
			drawerLeft: 0,
			copyrightTop: 0,
		};
	}
	componentDidMount() {
		// window.innerWidth >= 640 && window.addEventListener('scroll', () => {
		//     const t = document.documentElement.scrollTop || document.body.scrollTop;
		//     console.log(t)
		//     if (t > 500) {
		//         this.setState({ copyrightFixed: true })
		//     } else {
		//         this.setState({ copyrightFixed: false })
		//     }
		// })
		//将初始状态保存以便固定
		var toTop =
			document.documentElement.scrollTop || document.body.scrollTop;
		this.setState({
			drawerLeft: this.drawer.getBoundingClientRect().left,
			drawerWidth: this.drawer.getBoundingClientRect().width,
			copyrightTop: this.copyright.getBoundingClientRect().top + toTop,
		});
	}
	render() {
		const { lang } = this.props;
		const {
			copyrightFixed,
			drawerWidth,
			drawerLeft,
			copyrightTop,
		} = this.state;
		const drawerStyle = copyrightFixed
			? {
					left: drawerLeft,
					width: drawerWidth + "px",
			  }
			: {};
		return (
			<div
				ref={(r) => (this.drawer = r)}
				style={drawerStyle}
				className={`${copyrightFixed ? "Pos(fixed)" : ""}`}
			>
				<Headmaster config={this.props.config.author} />
				<CardMenu />
				<div
					ref={(r) => (this.copyright = r)}
					className={`Dis(flex) Textc(secondary) copyright`}
				>
					<div className="copyright-inner Dis(flex)">
						<Language
							value={lang}
							list={[
								{
									text: "简体中文",
									code: "zh-CN",
								},
								{
									text: "English",
									code: "en-US",
								},
							]}
						/>
						<div><p>
							Developed by <a href="https://www.rene.wang/">江村暮</a><br/>
							Branch developed by <a href="https://gloridust.tk/">辉晨Gloridust</a> <br/>
							Managed by CFLSGX团学会</p>
						</div>
						<div>
							本网站代码完全<a href="https://github.com/Gloridust/cfblogdev">
                                <u>开源</u>
							</a>,仅供学习交流使用
						</div>
					</div>
				</div>
			</div>
		);
	}
}
