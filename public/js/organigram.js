const layouts = {
    layout1: (data) => {
        return `<div class="organigram_content img1">
                    <div>
                        <img src="/img/asset/himpunan mahasiswa informatika_20251118_231232_0000.png" alt="Logo Himpunan Mahasiswa Informatika" class="logo organigram" />
                        <img src="/img/asset/5_20251118_084832_0004.webp" alt="" class="orang1">
                            <h1 id="ketua">KETUA <br>UMUM</h1>
                            <p class="nama">Bayu Danu Brata</p>
                                <div class="box1 organigram">
                                    <h1>HIMIN</h1>
                                    <h1>HIMIN</h1>
                        </div>
                    </div>`
    },
    layout2: (data) => {
        return `<div class="organigram_content img2">
                    <div>
                        <img src="/img/asset/himpunan mahasiswa informatika_20251118_231232_0000.png" alt="Logo Himpunan Mahasiswa Informatika" class="logo organigram"/>
                            <h1 id="ketua">WAKIL KETUA<br>UMUM</h1>
                            <p class="nama">Naila Suci Lestari</p>
                            <img src="/img/asset/6_20251118_084832_0005.webp" alt="orang2" class="orang2">
                                <div class="box1 organigram">
                                    <h1>HIMIN</h1>
                                    <h1>HIMIN</h1>
                            </div>
                    </div>`
    },
    layout3: (data) => {
        return `<div class="organigram_content img3">
                    <div>
                        <img src="/img/asset/himpunan mahasiswa informatika_20251118_231232_0000.png"  alt="Logo Himpunan Mahasiswa Informatika" class="logo organigram" />
                            <h1 id="ketua">KETUA<br>SATU</h1>
                            <p class="nama">Astri Sri Lestari</p>
                            <img src="/img/asset/7_20251118_084832_0006.webp" alt="orang2" class="orang2">
                                <div class="box1 organigram">
                                    <h1>HIMIN</h1>
                                    <h1>HIMIN</h1>
                                </div>
                            </div>
                    </div>`
    },
    layout4: (data) => {
        return ` <div class="organigram_content img4">
                    <div>
                        <h2 id="organigram">ORGANIGRAM</h2>
                        <button id="btn_read_more" class="organigram">Read More</button>
                        <img src="/img/asset/himpunan mahasiswa informatika_20251118_231232_0000.png" alt="Logo Himpunan Mahasiswa Informatika" class="logo organigram" />
                            <h1 id="ketua">SEKRETARIA<br>UMUM</h1>
                            <p class="nama">M. Dzaki Al Hafidz</p>
                            <img src="/img/asset/8_20251118_084832_0007.webp" alt="orang2" class="orang2">
                                <div class="box1 organigram">
                                    <h1>HIMIN</h1>
                                    <h1>HIMIN</h1>
                                </div>
                        </div>
                    </div>`
    },
    layout5: (data) => {
        return `<div class="organigram_content img5">
                    <div>
                        <img src="/img/asset/himpunan mahasiswa informatika_20251118_231232_0000.png" alt="Logo Himpunan Mahasiswa Informatika" class="logo organigram" />
                        <h1 id="ketua">BENDAHARA<br>UMUM</h1>
                        <p class="nama">M. Dzaki Al Hafidz</p>
                        <img src="/img/asset/9_20251118_084833_0008.webp" alt="orang2" class="orang2">
                            <div class="box1 organigram">
                                <h1>HIMIN</h1>
                                <h1>HIMIN</h1>
                            </div>
                    </div>
                </div>`
    },
    layout6: (data) => {
        return `<div class="organigram_content img6">
                    <div>
                        <img src="/img/asset/himpunan mahasiswa informatika_20251118_231232_0000.png" alt="Logo Himpunan Mahasiswa Informatika" class="logo organigram" />
                            <h1 id="ketua">SEKBID 1<br></h1>
                            <p class="nama">M. Hilmi Adzikri</p>
                            <p class="nama2">Rifqi Raihan</p>
                            <img src="/img/asset/10_20251118_084833_0009.webp" alt="orang2" class="orang2">
                                <div class="box1 organigram">
                                    <h1>HIMIN</h1>
                                    <h1>HIMIN</h1>
                                </div>
                            </div>
                    </div>`
    },
    layout7: (data) => {
        return `<div class="organigram_content img7">
                    <div>
                        <img src="/img/asset/himpunan mahasiswa informatika_20251118_231232_0000.png" alt="Logo Himpunan Mahasiswa Informatika" class="logo organigram" />
                        <h1 id="ketua">SEKBID 2<br></h1>
                        <p class="nama">M. Abdul Aziz K</p>
                        <p class="nama2">M. Fadly Farhan A.F</p>
                        <img src="/img/asset/11_20251118_084833_0010.webp" alt="orang2" class="orang2">
                            <div class="box1 organigram">
                                <h1>HIMIN</h1>
                                <h1>HIMIN</h1>
                            </div>
                    </div>
                </div>`
    },
    layout8: (data) => {
        return `<div class="organigram_content img8">
                    <div>
                        <img src="/img/asset/himpunan mahasiswa informatika_20251118_231232_0000.png" alt="Logo Himpunan Mahasiswa Informatika" class="logo organigram" />
                        <h1 id="ketua">SEKBID 3<br></h1>
                        <p class="nama">Elmar Sinatria A</p>
                        <img src="/img/asset/12_20251118_084833_0011.webp" alt="orang2" class="orang2">
                            <div class="box1 organigram">
                                <h1>HIMIN</h1>
                                <h1>HIMIN</h1>
                            </div>
                    </div>
                </div>`
    },
    layout9: (data) => {
        return `<div class="organigram_content img9">
                    <div>
                        <img src="/img/asset/himpunan mahasiswa informatika_20251118_231232_0000.png" alt="Logo Himpunan Mahasiswa Informatika" class="logo organigram" />
                        <h1 id="ketua">SEKBID 4<br></h1>
                        <p class="nama">Dava Aria G</p>
                        <img src="/img/asset/13_20251118_084833_0012.webp" alt="orang2" class="orang2">
                            <div class="box1 organigram">
                                <h1>HIMIN</h1>
                                <h1>HIMIN</h1>
                            </div>
                    </div>
                </div>`
    },
    layout10: (data) => {
        return `<div class="organigram_content img10">
                    <div>
                        <img src="/img/asset/himpunan mahasiswa informatika_20251118_231232_0000.png" alt="Logo Himpunan Mahasiswa Informatika" class="logo organigram" />
                            <h1 id="ketua">SEKBID 5<br></h1>
                            <p class="nama">Lukmanul Hakim</p>
                            <p class="nama2">Amelia Mozza</p>
                            <img src="/img/asset/14_20251118_084833_0013.webp" alt="orang2" class="orang2">
                                <div class="box1 organigram">
                                    <h1>HIMIN</h1>
                                    <h1>HIMIN</h1>
                                </div>
                            </div>
                    </div>`
    },
    layout11: (data) => {
        return `<div class="organigram_content img11">
                    <div>
                        <img src="/img/asset/himpunan mahasiswa informatika_20251118_231232_0000.png" alt="Logo Himpunan Mahasiswa Informatika" class="logo organigram" />
                            <h1 id="ketua">SEKBID 6<br></h1>
                            <p class="nama">Andini Kartika S</p>
                            <p class="nama2">Naya Permata L</p>
                            <p class="nama3">Ajeng Nuraini</p>
                            <img src="/img/asset/15_20251118_084833_0014.webp" alt="orang2" class="orang2">
                                <div class="box1 organigram">
                                    <h1>HIMIN</h1>
                                    <h1>HIMIN</h1>
                                </div>
                            </div>
                    </div>`
    },
    layout12: (data) => {
        return `<div class="organigram_content img12">
                    <div>
                        <img src="/img/asset/himpunan mahasiswa informatika_20251118_231232_0000.png" alt="Logo Himpunan Mahasiswa Informatika" class="logo organigram" />
                        <h1 id="ketua">SEKBID 7<br></h1>
                        <p class="nama">Bunga Dita N.A</p>
                        <p class="nama2">Neli Febrianti</p>
                        <img src="/img/asset/16_20251118_084833_0015.webp" alt="orang2" class="orang2">
                            <div class="box1 organigram">
                                <h1>HIMIN</h1>
                                <h1>HIMIN</h1>
                            </div>
                    </div>
                </div>`
    },
    layout13: (data) => {
        return `<div class="organigram_content img13">
                    <div>
                        <img src="/img/asset/himpunan mahasiswa informatika_20251118_231232_0000.png" alt="Logo Himpunan Mahasiswa Informatika" class="logo organigram" />
                        <h1 id="ketua">SEKBID 8<br></h1>
                        <p class="nama">Bunga Dita N.A</p>
                        <p class="nama2">Neli Febrianti</p>
                        <img src="/img/asset/17_20251118_084833_0016.webp" alt="orang2" class="orang2">
                            <div class="box1 organigram">
                                <h1>HIMIN</h1>
                                <h1>HIMIN</h1>
                            </div>
                    </div>
                </div>`
    },
    layout14: (data) => {
        return `
                <div class ="organigram_content img14">
                    <div>
                        <img src="/img/asset/himpunan mahasiswa informatika_20251118_231232_0000.png" alt="Logo Himpunan Mahasiswa Informatika" class="logo organigram" />
                        <h1 id="ketua">SEKBID 9<br></h1>
                        <p class="nama">Rusdi Dwi S</p>
                        <p class="nama2">Faishal H. AR R</p>
                        <p class="nama3">M. Rasya Aditya</p>
                        <img src="/img/asset/18_20251118_084833_0017.webp" alt="" class="orang2">
                    </div>
                </div>     
                        `
    }
}

const heroSection = document.querySelector('.hero_section')
const organigramContent = document.querySelector('.layout_container')
const nextIcon = document.getElementById('row_icon')

if(nextIcon){
    nextIcon.addEventListener('click', changeLayout)
}

let indexLayout = 1

function changeLayout() {
    let content = layouts[`layout${indexLayout}`]()
    heroSection.classList.remove(`img${indexLayout - 1}`)
    heroSection.classList.add(`img${indexLayout}`)

    organigramContent.innerHTML = "" 
    organigramContent.innerHTML = content
    indexLayout += 1
}
