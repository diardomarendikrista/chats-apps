import React from 'react';
import { Modal } from 'react-bootstrap';
import { Wrapper } from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faNode,
	faNodeJs,
	faReact,
	faBootstrap,
	faAtlassian,
} from '@fortawesome/free-brands-svg-icons';

export default function ModalAbout({ ...props }) {
	return (
		<Modal {...props} size="lg" centered backdrop="static">
			<Modal.Header closeButton></Modal.Header>
			<Modal.Body>
				<Wrapper>
					<div className="d-flex flex-column align-items-center mb-4">
						<h2>Tentang Aplikasi</h2>
						Petek Chat ver 0.2.0
					</div>
					<div>
						<p>
							Petek Chat merupakan aplikasi berbasis website yang digunakan
							untuk chatting dengan orang asing maupun orang yang di kenal
							dengan menggunakan kanal ruangan yang disediakan / membuat kanal
							ruangan sendiri.
						</p>
						<p>
							layanan ini merupakan layanan gratis, tidak dipungut biaya, dan
							semua isi dari percakapan yang ada di masing2 ruang maupun masing2
							individu adalah diluar tanggung jawab dari saya, jadi ketika ada
							pelanggaran hukum lokal maupun hukum internasional, tanggung jawab
							ada pada masing-masing pemilik akun dan/atau ruangan. saya selaku
							developer petek chat hanya akan memberikan seluruh dan/atau
							sebagian dari database ini ke pihak yang berwajib.
						</p>
						<div className="mb-3">
							<b>Tech Stack</b>
							<br />
							<b>Backend:</b>{' '}
							<FontAwesomeIcon icon={faNode} className="text-info" /> Node JS,{' '}
							<FontAwesomeIcon icon={faNodeJs} className="text-warning" />{' '}
							Express,{' '}
							<FontAwesomeIcon icon={faNodeJs} className="text-warning" />{' '}
							Sequelize, Socket.io, bcryptjs, cors, jsonwebtoken, moment, pg.
							<br />
							<b>Frontend:</b>{' '}
							<FontAwesomeIcon icon={faReact} className="text-info" /> React JS,
							Socket.io,{' '}
							<FontAwesomeIcon icon={faBootstrap} className="text-primary" />{' '}
							bootstrap, <FontAwesomeIcon icon={faAtlassian} className="text-warning" /> axios, moment,{' '}
							<FontAwesomeIcon icon={faReact} className="text-info" />{' '}
							Redux, Sweetalert,{' '}
							<FontAwesomeIcon icon={faReact} className="text-info" />{' '}
							React-Router.
						</div>
						<div className="mt-4">
							<b>Masalah yang sudah ada :</b>
							<ul>
								<li>
									Status online hanya dapat dilacak untuk ruangan yang terahir
									dimasuki. akan diperbaiki setelah permasalahan diketahui.
									(untuk saat ini tidak mempengaruhi apapun selain status saja).
								</li>
							</ul>
							<b>Update kedepan :</b>
							<ul>
								<li>
									Fitur ruangan <i>private</i> dengan <i>password</i>, akan
									diupdate (masih dalam tahap tester).
								</li>
								<li>
									Fitur search dan filter ruangan, agar ketika jumlah ruangan
									sudah sangat banyak, akan memudahkan dalam mencari ruangan
									yang di inginkan.
								</li>
								<li>Filter ruangan yang dibuat sendiri.</li>
								<li>Edit ruangan (mengubah nama).</li>
							</ul>
						</div>
						<hr />
						<div className="d-flex justify-content-center text-center">
							<small>
								No Copyright &copy;2022 -{' '}
								<a
									href="https://diardokrista.web.app/"
									rel="noreferrer"
									target="_blank"
								>
									Diardo Marendi Krista
								</a>
								<br />
								Petek Chat, No Right Reserved
							</small>
						</div>
					</div>
				</Wrapper>
			</Modal.Body>
		</Modal>
	);
}
