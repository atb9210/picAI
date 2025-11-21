<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Chat Image Editor - Crea AI</title>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Quicksand', sans-serif;
            background: #f8f9fa;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 0;
        }
        
        .app-container {
            width: 100%;
            height: 100vh;
            max-width: 720px;
            background: #ffffff;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }
        
        .app-header {
            height: 70px;
            background: linear-gradient(90deg, #6a11cb 0%, #2575fc 100%);
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 20px;
            color: white;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        .app-title {
            font-size: 24px;
            font-weight: 700;
            display: flex;
            align-items: center;
        }
        
        .app-title .material-icons {
            margin-right: 10px;
        }
        
        .credits-indicator {
            display: flex;
            align-items: center;
            background: rgba(255, 255, 255, 0.2);
            padding: 6px 12px;
            border-radius: 20px;
        }
        
        .credits-indicator .material-icons {
            margin-right: 6px;
            font-size: 18px;
        }
        
        .credits-text {
            font-weight: 600;
            font-size: 14px;
        }
        
        .create-container {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            background: #f8f9fa;
            display: flex;
            flex-direction: column;
        }
        
        .prompt-section {
            background: white;
            border-radius: 20px;
            padding: 20px;
            margin-bottom: 15px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }
        
        .section-title {
            font-size: 18px;
            font-weight: 600;
            color: #333;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
        }
        
        .section-title .material-icons {
            margin-right: 8px;
            color: #6a11cb;
        }
        
        .prompt-textarea {
            width: 100%;
            min-height: 100px;
            padding: 15px;
            border: 2px solid #e0e0e0;
            border-radius: 15px;
            font-size: 16px;
            font-family: 'Quicksand', sans-serif;
            resize: none;
            outline: none;
            transition: border-color 0.3s;
        }
        
        .prompt-textarea:focus {
            border-color: #6a11cb;
        }
        
        .suggestions {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 10px;
        }
        
        .suggestion-chip {
            padding: 6px 12px;
            border-radius: 15px;
            background: #f0f2f5;
            color: #666;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .suggestion-chip:hover {
            background: #e0e0e0;
        }
        
        .credits-needed {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 15px 0;
            font-size: 14px;
            color: #666;
        }
        
        .credits-needed .material-icons {
            margin-right: 5px;
            color: #6a11cb;
            font-size: 16px;
        }
        
        .credits-amount {
            font-weight: 600;
            color: #6a11cb;
        }
        
        .create-button {
            width: 100%;
            padding: 16px;
            border-radius: 15px;
            background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
            border: none;
            color: white;
            font-weight: 700;
            font-size: 18px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 10px rgba(106, 17, 203, 0.3);
            margin-bottom: 15px;
            transition: all 0.3s ease;
        }
        
        .create-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(106, 17, 203, 0.4);
        }
        
        .create-button .material-icons {
            margin-right: 8px;
            font-size: 22px;
        }
        
        .settings-row {
            display: flex;
            gap: 15px;
            margin-bottom: 15px;
        }
        
        .settings-card {
            flex: 1;
            background: white;
            border-radius: 20px;
            padding: 15px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        
        .settings-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .settings-card-header {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
        }
        
        .settings-card-icon {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 12px;
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% {
                box-shadow: 0 0 0 0 rgba(106, 17, 203, 0.4);
            }
            70% {
                box-shadow: 0 0 0 10px rgba(106, 17, 203, 0);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(106, 17, 203, 0);
            }
        }
        
        .settings-card-icon .material-icons {
            font-size: 24px;
            color: white;
        }
        
        .settings-card-title {
            font-size: 16px;
            font-weight: 600;
            color: #333;
        }
        
        .settings-card-feedback {
            display: flex;
            flex-direction: column;
            gap: 5px;
            margin-top: 10px;
        }
        
        .feedback-item {
            display: flex;
            align-items: center;
            font-size: 14px;
            color: #555;
        }
        
        .feedback-item .material-icons {
            font-size: 16px;
            margin-right: 5px;
            color: #6a11cb;
        }
        
        .feedback-value {
            font-weight: 600;
            color: #333;
        }
        
        .examples-section {
            background: white;
            border-radius: 20px;
            padding: 15px;
            margin-bottom: 15px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }
        
        .examples-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
        }
        
        .example-item {
            position: relative;
            border-radius: 15px;
            overflow: hidden;
            aspect-ratio: 1;
            cursor: pointer;
        }
        
        .example-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .example-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
            padding: 10px;
            color: white;
            font-size: 12px;
        }
        
        .nav-bar {
            height: 60px;
            background: white;
            display: flex;
            justify-content: space-around;
            align-items: center;
            border-top: 1px solid #eee;
        }
        
        .nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            color: #888;
        }
        
        .nav-item.active {
            color: #6a11cb;
        }
        
        .nav-icon {
            font-size: 24px;
        }
        
        .nav-text {
            font-size: 12px;
            margin-top: 4px;
        }
        
        /* Modal Styles */
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s, visibility 0.3s;
        }
        
        .modal-overlay.active {
            opacity: 1;
            visibility: visible;
        }
        
        .modal {
            background: white;
            border-radius: 20px;
            width: 90%;
            max-width: 500px;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            transform: translateY(20px);
            transition: transform 0.3s;
        }
        
        .modal-overlay.active .modal {
            transform: translateY(0);
        }
        
        .modal-header {
            padding: 20px;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .modal-title {
            font-size: 20px;
            font-weight: 700;
            color: #333;
            display: flex;
            align-items: center;
        }
        
        .modal-title .material-icons {
            margin-right: 8px;
            color: #6a11cb;
        }
        
        .modal-close {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: #f0f2f5;
            border: none;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            color: #666;
        }
        
        .modal-content {
            padding: 20px;
        }
        
        .style-options {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
        }
        
        .style-option {
            padding: 15px;
            border-radius: 15px;
            background: #f8f9fa;
            border: 2px solid transparent;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
        }
        
        .style-option:hover {
            background: #f0f2f5;
        }
        
        .style-option.active {
            border-color: #6a11cb;
            background: rgba(106, 17, 203, 0.05);
        }
        
        .style-icon {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 12px;
        }
        
        .style-icon .material-icons {
            font-size: 24px;
            color: white;
        }
        
        .style-name {
            font-weight: 600;
            color: #333;
        }
        
        .dimensions-container {
            display: flex;
            gap: 10px;
            margin-bottom: 15px;
        }
        
        .dimension-option {
            flex: 1;
            padding: 12px;
            border-radius: 12px;
            background: #f8f9fa;
            border: 2px solid transparent;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .dimension-option:hover {
            background: #f0f2f5;
        }
        
        .dimension-option.active {
            border-color: #6a11cb;
            background: rgba(106, 17, 203, 0.05);
        }
        
        .dimension-label {
            font-weight: 600;
            color: #333;
            margin-bottom: 4px;
        }
        
        .dimension-value {
            font-size: 14px;
            color: #666;
        }
        
        .slider-container {
            margin-bottom: 15px;
        }
        
        .slider-label {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
        }
        
        .slider-name {
            font-weight: 600;
            color: #333;
        }
        
        .slider-value {
            color: #6a11cb;
            font-weight: 600;
        }
        
        .slider {
            width: 100%;
            height: 6px;
            border-radius: 3px;
            background: #e0e0e0;
            outline: none;
            -webkit-appearance: none;
        }
        
        .slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
            cursor: pointer;
        }
        
        .slider::-moz-range-thumb {
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
            cursor: pointer;
            border: none;
        }
    </style>
</head>
<body>
    <div class="app-container">
        <div class="app-header">
            <div class="app-title">
                <i class="material-icons">add_photo_alternate</i>
                Crea AI
            </div>
            <div class="credits-indicator">
                <i class="material-icons">account_balance_wallet</i>
                <span class="credits-text">150 crediti</span>
            </div>
        </div>
        
        <div class="create-container">
            <div class="prompt-section">
                <h3 class="section-title">
                    <i class="material-icons">description</i>
                    Descrivi l'immagine
                </h3>
                <textarea class="prompt-textarea" placeholder="Descrivi l'immagine che vuoi creare..."></textarea>
                <div class="suggestions">
                    <div class="suggestion-chip">Un gatto astronauta</div>
                    <div class="suggestion-chip">Paesaggio fantasy</div>
                    <div class="suggestion-chip">Ritratto cyberpunk</div>
                    <div class="suggestion-chip">Città futuristica</div>
                </div>
            </div>
            
            <div class="credits-needed">
                <i class="material-icons">info</i>
                <span>Crediti necessari: <span class="credits-amount">5</span></span>
            </div>
            
            <button class="create-button">
                <i class="material-icons">auto_awesome</i>
                Crea immagine
            </button>
            
            <div class="settings-row">
                <div class="settings-card" id="styleCard">
                    <div class="settings-card-header">
                        <div class="settings-card-icon">
                            <i class="material-icons">brush</i>
                        </div>
                        <div class="settings-card-title">Stile</div>
                    </div>
                    <div class="settings-card-feedback">
                        <div class="feedback-item">
                            <i class="material-icons">photo_camera</i>
                            <span>Stile: <span class="feedback-value">Fotografico</span></span>
                        </div>
                        <div class="feedback-item">
                            <i class="material-icons">aspect_ratio</i>
                            <span>Formato: <span class="feedback-value">1:1</span></span>
                        </div>
                    </div>
                </div>
                
                <div class="settings-card" id="settingsCard">
                    <div class="settings-card-header">
                        <div class="settings-card-icon">
                            <i class="material-icons">tune</i>
                        </div>
                        <div class="settings-card-title">Impostazioni</div>
                    </div>
                    <div class="settings-card-feedback">
                        <div class="feedback-item">
                            <i class="material-icons">auto_awesome</i>
                            <span>Creatività: <span class="feedback-value">75%</span></span>
                        </div>
                        <div class="feedback-item">
                            <i class="material-icons">high_quality</i>
                            <span>Dettaglio: <span class="feedback-value">60%</span></span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="examples-section">
                <h3 class="section-title">
                    <i class="material-icons">lightbulb</i>
                    Ispirazione
                </h3>
                <div class="examples-grid">
                    <div class="example-item">
                        <img src="https://picsum.photos/seed/aiexample1/300/300.jpg" alt="Esempio 1">
                        <div class="example-overlay">"Un castello su una nuvola"</div>
                    </div>
                    <div class="example-item">
                        <img src="https://picsum.photos/seed/aiexample2/300/300.jpg" alt="Esempio 2">
                        <div class="example-overlay">"Ritratto di un robot antico"</div>
                    </div>
                    <div class="example-item">
                        <img src="https://picsum.photos/seed/aiexample3/300/300.jpg" alt="Esempio 3">
                        <div class="example-overlay">"Foresta magica notturna"</div>
                    </div>
                    <div class="example-item">
                        <img src="https://picsum.photos/seed/aiexample4/300/300.jpg" alt="Esempio 4">
                        <div class="example-overlay">"Città sottomarina futuristica"</div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="nav-bar">
            <div class="nav-item active">
                <i class="material-icons nav-icon">add_photo_alternate</i>
                <span class="nav-text">Crea AI</span>
            </div>
            <div class="nav-item">
                <i class="material-icons nav-icon">photo_library</i>
                <span class="nav-text">Galleria</span>
            </div>
            <div class="nav-item">
                <i class="material-icons nav-icon">edit</i>
                <span class="nav-text">Modifica AI</span>
            </div>
            <div class="nav-item">
                <i class="material-icons nav-icon">person</i>
                <span class="nav-text">Profilo</span>
            </div>
        </div>
    </div>
    
    <!-- Modal per lo stile -->
    <div class="modal-overlay" id="styleModal">
        <div class="modal">
            <div class="modal-header">
                <h3 class="modal-title">
                    <i class="material-icons">brush</i>
                    Scegli lo stile
                </h3>
                <button class="modal-close" id="closeStyleModal">
                    <i class="material-icons">close</i>
                </button>
            </div>
            <div class="modal-content">
                <div class="style-options">
                    <div class="style-option active">
                        <div class="style-icon">
                            <i class="material-icons">photo_camera</i>
                        </div>
                        <div class="style-name">Fotografico</div>
                    </div>
                    <div class="style-option">
                        <div class="style-icon">
                            <i class="material-icons">palette</i>
                        </div>
                        <div class="style-name">Pittura</div>
                    </div>
                    <div class="style-option">
                        <div class="style-icon">
                            <i class="material-icons">edit</i>
                        </div>
                        <div class="style-name">Disegno</div>
                    </div>
                    <div class="style-option">
                        <div class="style-icon">
                            <i class="material-icons">auto_awesome</i>
                        </div>
                        <div class="style-name">Fantasy</div>
                    </div>
                </div>
                
                <div class="dimensions-container">
                    <div class="dimension-option active">
                        <div class="dimension-label">Quadrato</div>
                        <div class="dimension-value">1:1</div>
                    </div>
                    <div class="dimension-option">
                        <div class="dimension-label">Ritratto</div>
                        <div class="dimension-value">4:5</div>
                    </div>
                    <div class="dimension-option">
                        <div class="dimension-label">Panoramica</div>
                        <div class="dimension-value">16:9</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Modal per le impostazioni -->
    <div class="modal-overlay" id="settingsModal">
        <div class="modal">
            <div class="modal-header">
                <h3 class="modal-title">
                    <i class="material-icons">tune</i>
                    Impostazioni avanzate
                </h3>
                <button class="modal-close" id="closeSettingsModal">
                    <i class="material-icons">close</i>
                </button>
            </div>
            <div class="modal-content">
                <div class="slider-container">
                    <div class="slider-label">
                        <span class="slider-name">Creatività</span>
                        <span class="slider-value">75%</span>
                    </div>
                    <input type="range" class="slider" min="0" max="100" value="75">
                </div>
                <div class="slider-container">
                    <div class="slider-label">
                        <span class="slider-name">Dettaglio</span>
                        <span class="slider-value">60%</span>
                    </div>
                    <input type="range" class="slider" min="0" max="100" value="60">
                </div>
            </div>
        </div>
    </div>
    
    <script>
        // Gestione del modal dello stile
        const styleCard = document.getElementById('styleCard');
        const styleModal = document.getElementById('styleModal');
        const closeStyleModal = document.getElementById('closeStyleModal');
        
        // Apertura del modal dello stile
        styleCard.addEventListener('click', function() {
            styleModal.classList.add('active');
        });
        
        // Chiusura del modal dello stile
        closeStyleModal.addEventListener('click', function() {
            styleModal.classList.remove('active');
        });
        
        // Chiusura del modal dello stile cliccando fuori
        styleModal.addEventListener('click', function(e) {
            if (e.target === styleModal) {
                styleModal.classList.remove('active');
            }
        });
        
        // Gestione del modal delle impostazioni
        const settingsCard = document.getElementById('settingsCard');
        const settingsModal = document.getElementById('settingsModal');
        const closeSettingsModal = document.getElementById('closeSettingsModal');
        
        // Apertura del modal delle impostazioni
        settingsCard.addEventListener('click', function() {
            settingsModal.classList.add('active');
        });
        
        // Chiusura del modal delle impostazioni
        closeSettingsModal.addEventListener('click', function() {
            settingsModal.classList.remove('active');
        });
        
        // Chiusura del modal delle impostazioni cliccando fuori
        settingsModal.addEventListener('click', function(e) {
            if (e.target === settingsModal) {
                settingsModal.classList.remove('active');
            }
        });
        
        // Gestione delle opzioni di stile
        const styleOptions = document.querySelectorAll('.style-option');
        styleOptions.forEach(function(option) {
            option.addEventListener('click', function() {
                // Rimuovi la classe active da tutte le opzioni
                styleOptions.forEach(function(o) {
                    o.classList.remove('active');
                });
                
                // Aggiungi la classe active all'opzione cliccata
                this.classList.add('active');
                
                // Aggiorna il feedback nella card
                const styleName = this.querySelector('.style-name').textContent;
                document.querySelector('.settings-card-feedback .feedback-item:first-child .feedback-value').textContent = styleName;
            });
        });
        
        // Gestione delle opzioni di dimensione
        const dimensionOptions = document.querySelectorAll('.dimension-option');
        dimensionOptions.forEach(function(option) {
            option.addEventListener('click', function() {
                // Rimuovi la classe active da tutte le opzioni
                dimensionOptions.forEach(function(o) {
                    o.classList.remove('active');
                });
                
                // Aggiungi la classe active all'opzione cliccata
                this.classList.add('active');
                
                // Aggiorna il feedback nella card
                const dimensionValue = this.querySelector('.dimension-value').textContent;
                document.querySelector('.settings-card-feedback .feedback-item:last-child .feedback-value').textContent = dimensionValue;
            });
        });
        
        // Gestione degli slider
        const sliders = document.querySelectorAll('.slider');
        sliders.forEach(function(slider) {
            slider.addEventListener('input', function() {
                const value = this.value;
                const valueDisplay = this.parentElement.querySelector('.slider-value');
                valueDisplay.textContent = value + '%';
                
                // Aggiorna il feedback nella card
                const sliderName = this.parentElement.querySelector('.slider-name').textContent;
                if (sliderName === 'Creatività') {
                    document.querySelector('#settingsCard .settings-card-feedback .feedback-item:first-child .feedback-value').textContent = value + '%';
                } else if (sliderName === 'Dettaglio') {
                    document.querySelector('#settingsCard .settings-card-feedback .feedback-item:last-child .feedback-value').textContent = value + '%';
                }
            });
        });
    </script>
</body>
</html>