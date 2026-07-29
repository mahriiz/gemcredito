document.addEventListener("DOMContentLoaded", () => {
    // 1. Inicialização da Biblioteca de Animações AOS
    AOS.init({
        duration: 800,
        once: true
    });

    // 2. Menu Responsivo Mobile
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");

    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });

    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => navMenu.classList.remove("active"));
    });

    // 3. Captura do Formulário do Topo (Enviar para WhatsApp)
    const leadForm = document.getElementById("leadForm");
    leadForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const phone = document.getElementById("userPhone").value.trim();
        const whatsappNum = "5515976021399";
        const message = `Olá! Gostaria de simular um crédito. Meu telefone é: ${phone}`;
        
        window.open(`https://wa.me/${whatsappNum}?text=${encodeURIComponent(message)}`, "_blank");
    });

    // 4. Simulador Dinâmico de Parcelas
    const rangeAmount = document.getElementById("rangeAmount");
    const amountValue = document.getElementById("amountValue");
    const selectMonths = document.getElementById("selectMonths");
    const installmentResult = document.getElementById("installmentResult");
    const btnSimulateWS = document.getElementById("btnSimulateWS");

    function updateSimulation() {
        const val = parseFloat(rangeAmount.value);
        const months = parseInt(selectMonths.value);
        
        // Taxa estimada de ~1.99% ao mês para fins de projeção do simulador
        const rate = 0.0199; 
        const pmt = (val * (rate * Math.pow(1 + rate, months))) / (Math.pow(1 + rate, months) - 1);
        
        amountValue.innerText = val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
        installmentResult.innerText = `${pmt.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} / mês`;
    }

    rangeAmount.addEventListener("input", updateSimulation);
    selectMonths.addEventListener("change", updateSimulation);

    btnSimulateWS.addEventListener("click", () => {
        const type = document.getElementById("selectCreditType").value;
        const val = rangeAmount.value;
        const months = selectMonths.value;
        const whatsappNum = "5515976021399";
        const message = `Olá! Fiz uma simulação no site para a opção *${type}*: Valor R$ ${val} em ${months}x parcelas. Podemos dar andamento?`;
        
        window.open(`https://wa.me/${whatsappNum}?text=${encodeURIComponent(message)}`, "_blank");
    });

    // Executa no carregamento da página
    updateSimulation();

    // 5. Animação numéricas dos Contadores
    const counters = document.querySelectorAll(".counter");
    counters.forEach(counter => {
        const animate = () => {
            const value = +counter.getAttribute("data-target");
            const data = +counter.innerText;
            const time = value / 200;

            if (data < value) {
                counter.innerText = Math.ceil(data + time);
                setTimeout(animate, 25);
            } else {
                counter.innerText = value.toLocaleString("pt-BR");
            }
        };
        animate();
    });

    // 6. Componente de Acordeão (FAQ)
    const faqItems = document.querySelectorAll(".accordion-item");
    faqItems.forEach(item => {
        const header = item.querySelector(".accordion-header");
        header.addEventListener("click", () => {
            item.classList.toggle("active");
        });
    });

    // 7. Banner de Consentimento LGPD
    const lgpdBanner = document.getElementById("lgpdBanner");
    const acceptLgpd = document.getElementById("acceptLgpd");

    if (localStorage.getItem("lgpdAccepted")) {
        lgpdBanner.style.display = "none";
    }

    acceptLgpd.addEventListener("click", () => {
        localStorage.setItem("lgpdAccepted", "true");
        lgpdBanner.style.display = "none";
    });
});