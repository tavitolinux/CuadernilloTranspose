// Diccionarios de Tonos
const keysDict = [
    { name: 'Ab', value: 0, type: 'F' }, { name: 'A', value: 1, type: 'N' },
    { name: 'A#', value: 2, type: 'S' }, { name: 'Bb', value: 2, type: 'F' },
    { name: 'B', value: 3, type: 'N' }, { name: 'C', value: 4, type: 'N' },
    { name: 'C#', value: 5, type: 'S' }, { name: 'Db', value: 5, type: 'F' },
    { name: 'D', value: 6, type: 'N' }, { name: 'D#', value: 7, type: 'S' },
    { name: 'Eb', value: 7, type: 'F' }, { name: 'E', value: 8, type: 'N' },
    { name: 'F', value: 9, type: 'N' }, { name: 'F#', value: 10, type: 'S' },
    { name: 'Gb', value: 10, type: 'F' }, { name: 'G', value: 11, type: 'N' },
    { name: 'G#', value: 0, type: 'S' }
];

const displayKeys = [
    { name: 'C', value: 4, type: 'N' }, { name: 'C#', value: 5, type: 'S' },
    { name: 'D', value: 6, type: 'N' }, { name: 'Eb', value: 7, type: 'F' },
    { name: 'E', value: 8, type: 'N' }, { name: 'F', value: 9, type: 'N' },
    { name: 'F#', value: 10, type: 'S' }, { name: 'G', value: 11, type: 'N' },
    { name: 'Ab', value: 0, type: 'F' }, { name: 'A', value: 1, type: 'N' },
    { name: 'Bb', value: 2, type: 'F' }, { name: 'B', value: 3, type: 'N' }
];

const chordRegexLine = /^[A-G][b\#]?(2|4|5|6|7|9|11|13|6\/9|7\-5|7\-9|7\#5|7\#9|7\+5|7\+9|b5|#5|#9|7b5|7b9|7sus2|7sus4|add2|add4|add9|aug|dim|dim7|m\/maj7|m6|m7|m7b5|m9|m11|m13|maj7|maj9|maj11|maj13|M7|M9|M11|M13|mb5|m|sus|sus2|sus4)*(\/[A-G][b\#]*)*$/;
const chordReplaceRegex = /([A-G][b\#]?(2|4|5|6|7|9|11|13|6\/9|7\-5|7\-9|7\#5|7\#9|7\+5|7\+9|b5|#5|#9|7b5|7b9|7sus2|7sus4|add2|add4|add9|aug|dim|dim7|m\/maj7|m6|m7|m7b5|m9|m11|m13|maj7|maj9|maj11|maj13|M7|M9|M11|M13|mb5|m|sus|sus2|sus4)*)/g;

const songDatabase = [
    { title: 'A1. A Cristo, sólo a Cristo', url: 'cancion_a1.html' },
        { title: 'A2. A los pies del maestro me senté', url: 'cancion_a2.html' },
        { title: 'A3. A mi Cristo quiero ser fiel', url: 'cancion_a3.html' },
        { title: 'A4. //A quién iremos, a guién iremos', url: 'cancion_a4.html' },
        { title: 'A5. //A su nombre gloria,', url: 'cancion_a5.html' },
        { title: 'A6. A ti omnipotente servimos', url: 'cancion_a6.html' },
        { title: 'A7. Abre mis ojos', url: 'cancion_a7.html' },
        { title: 'A8. Ábreme las puertas de justicia,', url: 'cancion_a8.html' },
        { title: 'A9. //Aclamad a Dios', url: 'cancion_a9.html' },
        { title: 'A10. Adelante oh Rey eterno', url: 'cancion_a10.html' },
        { title: 'A11. Admirable consejero, Cristo', url: 'cancion_a11.html' },
        { title: 'A12. Ahora canta, canta, canta, canta', url: 'cancion_a12.html' },
        { title: 'A13. Ahora en Cristo soy nueva criatura', url: 'cancion_a13.html' },
        { title: 'A14. Ahora es tiempo de alabar a Dios', url: 'cancion_a14.html' },
        { title: 'A15. Al Cristo vivo sirvo', url: 'cancion_a15.html' },
        { title: 'A16. Al que está sentado en el trono', url: 'cancion_a16.html' },
        { title: 'A17. //Al que está sentado en el trono y al', url: 'cancion_a17.html' },
        { title: 'A18. Al que nos amó y nos lavó', url: 'cancion_a18.html' },
        { title: 'A19. ////Al Señor sea la majestad', url: 'cancion_a19.html' },
        { title: 'A20. // Alaba al Señor y canta aleluya', url: 'cancion_a20.html' },
        { title: 'A21. Alabad a Jehová naciones todas', url: 'cancion_a21.html' },
        { title: 'A22. Alabad siervos de Jehová', url: 'cancion_a22.html' },
        { title: 'A23. Alabaré, Alabaré', url: 'cancion_a23.html' },
        { title: 'A24. Alcemos un canto con gozo', url: 'cancion_a24.html' },
        { title: 'A25. Alégrate oh estéril', url: 'cancion_a25.html' },
        { title: 'A26. //Alelu, alelu, alelu, aleluya', url: 'cancion_a26.html' },
        { title: 'A27. Aleluya, Aleluya', url: 'cancion_a27.html' },
        { title: 'A28. Aleluya, Aleluya', url: 'cancion_a28.html' },
        { title: 'A29. Aleluya, Aleluya,', url: 'cancion_a29.html' },
        { title: 'A30. Aleluya, Aleluya,', url: 'cancion_a30.html' },
        { title: 'A31. Aleluya, Hosanna,', url: 'cancion_a31.html' },
        { title: 'A32. //Aleluya', url: 'cancion_a32.html' },
        { title: 'A33. Algo sucedió el día', url: 'cancion_a33.html' },
        { title: 'A34. Alza tu voz al Señor y Rey', url: 'cancion_a34.html' },
        { title: 'A35. //Alzad oh puertas vuestras cabezas', url: 'cancion_a35.html' },
        { title: 'A36. Alzaré mis ojos a los montes', url: 'cancion_a36.html' },
        { title: 'A37. Alzo mis manos al Señor', url: 'cancion_a37.html' },
        { title: 'A38. /// Allá en el cielo ///', url: 'cancion_a38.html' },
        { title: 'A39. Ama si quieres ser feliz', url: 'cancion_a39.html' },
        { title: 'A40. Amados, amémonos unos a otros', url: 'cancion_a40.html' },
        { title: 'A41. Amarte sólo a ti Señor', url: 'cancion_a41.html' },
        { title: 'A42. //Amo a Jehová pues ha oído mi voz.', url: 'cancion_a42.html' },
        { title: 'A43. Amo a mi Señor más que a mi vida', url: 'cancion_a43.html' },
        { title: 'A44. Ampárame Omnipotente', url: 'cancion_a44.html' },
        { title: 'A45. Anda delante de mí y sé perfecto,', url: 'cancion_a45.html' },
        { title: 'A46. Ando con Cristo en sombras y en luz', url: 'cancion_a46.html' },
        { title: 'A47. Antes de ti Señor mi alma', url: 'cancion_a47.html' },
        { title: 'A48. Anunciadora de Sion levanta tu voz.', url: 'cancion_a48.html' },
        { title: 'A49. Aplaudid tus manos', url: 'cancion_a49.html' },
        { title: 'A50. Aquel que fue manifestado en la carne,', url: 'cancion_a50.html' },
        { title: 'A51. Aquél quien', url: 'cancion_a51.html' },
        { title: 'A52. Aquí hay un muchacho', url: 'cancion_a52.html' },
        { title: 'A53. Aquí estás mi gran Señor', url: 'cancion_a53.html' },
        { title: 'A54. //Arrasando muros tomad la ciudad;', url: 'cancion_a54.html' },
        { title: 'A55. Aun si mi vida derrumbarse pareciera', url: 'cancion_a55.html' },
        { title: 'A56. Aunque la higuera no florezca,', url: 'cancion_a56.html' },
        { title: 'A57. Aunque marche por la oscuridad', url: 'cancion_a57.html' },
        { title: 'A58. Aunque te nieguen,', url: 'cancion_a58.html' },
        { title: 'A59. Admirable es Jesús', url: 'cancion_a59.html' },
        { title: 'A60. // Alaba a Dios dile que le amas', url: 'cancion_a60.html' },
        { title: 'A61. //Alabad a Jehová porque el es bueno', url: 'cancion_a61.html' },
        { title: 'A62. Alabad siervos del Señor', url: 'cancion_a62.html' },
        { title: 'A63. Ante ti Señor mi alma levantaré', url: 'cancion_a63.html' },
        { title: 'A64. Amado Jesucris           to', url: 'cancion_a64.html' },
        { title: 'A65. A canta, a cantar, a cantar todos los', url: 'cancion_a65.html' },
        { title: 'A66. Al Rey de los reyes', url: 'cancion_a66.html' },
        { title: 'A67. //Abro hoy mi corazón', url: 'cancion_a67.html' },
        { title: 'A68. Aunque la higuera no florezca,', url: 'cancion_a68.html' },
        { title: 'A69. Alzaré mis manos, alzaré la voz,', url: 'cancion_a69.html' },
        { title: 'A70. A el alto y sublime', url: 'cancion_a70.html' },
        { title: 'A71. Amor tan grande profundo y sublime', url: 'cancion_a71.html' },
        { title: 'A72. Aunque en esta vida no tengo riquezas,', url: 'cancion_a72.html' },
        { title: 'A73. //Alimentados con la palabra de fe', url: 'cancion_a73.html' },
        { title: 'A74. Al estar en la presencia', url: 'cancion_a74.html' },
        { title: 'A75. A ti, el Alfa y la Omega', url: 'cancion_a75.html' },
        { title: 'A76. Ayúdame a soportar', url: 'cancion_a76.html' },
        { title: 'B1. //Batid las manos, pueblos todos', url: 'cancion_b1.html' },
        { title: 'B2. Bendecid al Señor', url: 'cancion_b2.html' },
        { title: 'B3. Bendeciré a Jehová en todo tiempo', url: 'cancion_b3.html' },
        { title: 'B4. Bendeciré a Jesús en todo tiempo', url: 'cancion_b4.html' },
        { title: 'B5. Bendeciré a Jesús en todo tiempo', url: 'cancion_b5.html' },
        { title: 'B6. Bendice alma mía a Jehová', url: 'cancion_b6.html' },
        { title: 'B7. Bendigan al Señor, siervos del Altísimo', url: 'cancion_b7.html' },
        { title: 'B8. // Bendigan al Señor todos', url: 'cancion_b8.html' },
        { title: 'B9. Bendito, Bendito Cordero de Dios,', url: 'cancion_b9.html' },
        { title: 'B10. Bendito, Bendito, el Cordero de Dios', url: 'cancion_b10.html' },
        { title: 'B11. Bendito Cristo que hermoso es,', url: 'cancion_b11.html' },
        { title: 'B12. Bendito es el Señor', url: 'cancion_b12.html' },
        { title: 'B13. Bendito Jehová el Dios de Israel', url: 'cancion_b13.html' },
        { title: 'B14. //Bendito sea el Señor', url: 'cancion_b14.html' },
        { title: 'B15. Bienaventurado el hombre', url: 'cancion_b15.html' },
        { title: 'B16. Bien pudo hacer', url: 'cancion_b16.html' },
        { title: 'B18. Bueno es alabarte oh Señor', url: 'cancion_b18.html' },
        { title: 'B19. Busca primero el reino de Dios', url: 'cancion_b19.html' },
        { title: 'B20. Buscando por el mundo', url: 'cancion_b20.html' },
        { title: 'B21. // Bendito sea Jehová', url: 'cancion_b21.html' },
        { title: 'B22. Bendito seas tu', url: 'cancion_b22.html' },
        { title: 'B23. Buscaba amor', url: 'cancion_b23.html' },
        { title: 'B24. Bello como una mariposa', url: 'cancion_b24.html' },
        { title: 'B25. //Bueno es Dios, siempre fiel', url: 'cancion_b25.html' },
        { title: 'B26. Bendecid al Señor', url: 'cancion_b26.html' },
        { title: 'B27. Bueno es alabarte oh Dios', url: 'cancion_b27.html' },
        { title: 'B28. Bendita sea mi Roca', url: 'cancion_b28.html' },
        { title: 'B29. Bueno es alabar, oh Señor,', url: 'cancion_b29.html' },
        { title: 'B30. Bienaventurado el pueblo que sabe aclamarte', url: 'cancion_b30.html' },
        { title: 'C1. Cada día con Cristo,', url: 'cancion_c1.html' },
        { title: 'C2. Cada día de nuevo,', url: 'cancion_c2.html' },
        { title: 'C3. Cada día te adoraré,', url: 'cancion_c3.html' },
        { title: 'C4. Señor te siento lejos hoy', url: 'cancion_c4.html' },
        { title: 'C5. Cambia mi corazón', url: 'cancion_c5.html' },
        { title: 'C6. Cambiaste con tu luz mi corazón', url: 'cancion_c6.html' },
        { title: 'C7. Canta oh hija de Sion, grita oh Israel,', url: 'cancion_c7.html' },
        { title: 'C8. Cantad cantico nuevo,', url: 'cancion_c8.html' },
        { title: 'C9. Cantad alegres cantad a Dios', url: 'cancion_c9.html' },
        { title: 'C10. Cantad Alegres al Señor', url: 'cancion_c10.html' },
        { title: 'C11. //Cantad, cantad, cantad', url: 'cancion_c11.html' },
        { title: 'C12. //Cantaré a mi Señor por siempre', url: 'cancion_c12.html' },
        { title: 'C13. Cantaré al Señor por toda mi vida', url: 'cancion_c13.html' },
        { title: 'C14. Cantaré con gozo al Señor', url: 'cancion_c14.html' },
        { title: 'C15. //Cantaría   sin   parar', url: 'cancion_c15.html' },
        { title: 'C16. Canto alabanza al Cordero,', url: 'cancion_c16.html' },
        { title: 'C17. Castillo fuerte es nuestro Dios', url: 'cancion_c17.html' },
        { title: 'C18. Celebrad, celebrad', url: 'cancion_c18.html' },
        { title: 'C19. Celebra gozoso delante del Señor', url: 'cancion_c19.html' },
        { title: 'C20. Ciertamente oh Dios yo nada soy,', url: 'cancion_c20.html' },
        { title: 'C21. Ciertamente volverán', url: 'cancion_c21.html' },
        { title: 'C22. Claman los justos', url: 'cancion_c22.html' },
        { title: 'C23. Clamaré a mi Señor', url: 'cancion_c23.html' },
        { title: 'C24. Clamaré, al Señor', url: 'cancion_c24.html' },
        { title: 'C25. Cómo agradecerte', url: 'cancion_c25.html' },
        { title: 'C26. Cómo agradecer', url: 'cancion_c26.html' },
        { title: 'C27. Como David ante el Señor', url: 'cancion_c27.html' },
        { title: 'C28. Como hizo David delante de Dios', url: 'cancion_c28.html' },
        { title: 'C29. Como el ciervo brama por las aguas', url: 'cancion_c29.html' },
        { title: 'C30. Como el ciervo brama', url: 'cancion_c30.html' },
        { title: 'C31. Como el ciervo busca por las aguas', url: 'cancion_c31.html' },
        { title: 'C32. Como jabón de lavadores', url: 'cancion_c32.html' },
        { title: 'C33. Cómo me ama Jesús,', url: 'cancion_c33.html' },
        { title: 'C34. Con alegría saldréis, con paz regresaréis', url: 'cancion_c34.html' },
        { title: 'C35. Con mano fuerte', url: 'cancion_c35.html' },
        { title: 'C36. Con mis labios y mi vida', url: 'cancion_c36.html' },
        { title: 'C37. Con mis manos hacia el cielo', url: 'cancion_c37.html' },
        { title: 'C38. Con vino y aceite me ungió', url: 'cancion_c38.html' },
        { title: 'C39. Confía sólo en el Señor', url: 'cancion_c39.html' },
        { title: 'C40. Conocer a mi Cristo', url: 'cancion_c40.html' },
        { title: 'C41. Conozco que todo lo puedes', url: 'cancion_c41.html' },
        { title: 'C42. Consumado es, consumado es', url: 'cancion_c42.html' },
        { title: 'C43. Contigo siempre estaré', url: 'cancion_c43.html' },
        { title: 'C44. Crea en mí oh Dios', url: 'cancion_c44.html' },
        { title: 'C45. Creaste el universo,', url: 'cancion_c45.html' },
        { title: 'C46. Creo aunque todo', url: 'cancion_c46.html' },
        { title: 'C47. // Creo en ti, en ti, sólo en ti, en ti //', url: 'cancion_c47.html' },
        { title: 'C48. Cristo atráeme más y más a ti', url: 'cancion_c48.html' },
        { title: 'C49. Cristo, eres bello', url: 'cancion_c49.html' },
        { title: 'C50. Cristo es la peña de Horeb', url: 'cancion_c50.html' },
        { title: 'C51. Cristo es la roca de mi salvación', url: 'cancion_c51.html' },
        { title: 'C52. Cristo es mi Señor,', url: 'cancion_c52.html' },
        { title: 'C53. Cristo es mi tesoro', url: 'cancion_c53.html' },
        { title: 'C54. Cristo es Rey, todos alabad', url: 'cancion_c54.html' },
        { title: 'C55. Cristo está aquí', url: 'cancion_c55.html' },
        { title: 'C56. Cristo maravilloso eres tú,', url: 'cancion_c56.html' },
        { title: 'C57. Cristo no es ninguna religión', url: 'cancion_c57.html' },
        { title: 'C58. Cristo nombre glorioso, precioso salvador', url: 'cancion_c58.html' },
        { title: 'C59. Cristo rompe las cadenas', url: 'cancion_c59.html' },
        { title: 'C60. Cristo te amo, Cristo te amo', url: 'cancion_c60.html' },
        { title: 'C61. Cristo te exalto', url: 'cancion_c61.html' },
        { title: 'C62. Cristo, tu nombre es más alto', url: 'cancion_c62.html' },
        { title: 'C63. //Cristo vivo Cristo vivo', url: 'cancion_c63.html' },
        { title: 'C64. Cual la quietud de un arroyo', url: 'cancion_c64.html' },
        { title: 'C65. Cuán hermosos son', url: 'cancion_c65.html' },
        { title: 'C66. Cual pastor ansiado', url: 'cancion_c66.html' },
        { title: 'C67. Cuán preciosos son tus amores', url: 'cancion_c67.html' },
        { title: 'C68. Cuando Cristo no vivía aún en mí', url: 'cancion_c68.html' },
        { title: 'C69. //Cuando Cristo venga en Gloria', url: 'cancion_c69.html' },
        { title: 'C70. Cuando el Padre mandó a su Hijo', url: 'cancion_c70.html' },
        { title: 'C71. //Cuando el Señor hiciere volver', url: 'cancion_c71.html' },
        { title: 'C72. Cuando Jesús llegó,', url: 'cancion_c72.html' },
        { title: 'C73. Cuando la trompeta', url: 'cancion_c73.html' },
        { title: 'C74. Cuando la trompeta suene yo me voy,', url: 'cancion_c74.html' },
        { title: 'C75. Cuando miro a tu santidad', url: 'cancion_c75.html' },
        { title: 'C76. Cuando pienso en tu amor tan bello', url: 'cancion_c76.html' },
        { title: 'C77. Cuando tú llegaste a mi vida', url: 'cancion_c77.html' },
        { title: 'C78. Cuando yo sentí el amor de Dios', url: 'cancion_c78.html' },
        { title: 'C79. // Cuántas veces Señor perdonaré //', url: 'cancion_c79.html' },
        { title: 'C80. Cambia mi corazón necesito de ti', url: 'cancion_c80.html' },
        { title: 'C81. Canta aleluya al cordero en su trono', url: 'cancion_c81.html' },
        { title: 'C82. // Canta a Jehová cántico nuevo', url: 'cancion_c82.html' },
        { title: 'C83. Canta a Dios un canto nuevo', url: 'cancion_c83.html' },
        { title: 'C84. Cielos y nubes', url: 'cancion_c84.html' },
        { title: 'C85. Como el ciervo', url: 'cancion_c85.html' },
        { title: 'C86. Como el ciervo', url: 'cancion_c86.html' },
        { title: 'C87. Comprado con sangre por Cristo', url: 'cancion_c87.html' },
        { title: 'C88. Con mi corazón  te alabare señor  3v', url: 'cancion_c88.html' },
        { title: 'C89. Cristo el señor me ama por siempre', url: 'cancion_c89.html' },
        { title: 'C90. Cristo está conmigo lo puedo sentir', url: 'cancion_c90.html' },
        { title: 'C91. // Cristo Jesús Mesías salvador', url: 'cancion_c91.html' },
        { title: 'C92. Cristo me ama bien lose', url: 'cancion_c92.html' },
        { title: 'C93. Cristo quiero caminar  siempre contigo', url: 'cancion_c93.html' },
        { title: 'C94. Cristo te amo te alabo y te adoro', url: 'cancion_c94.html' },
        { title: 'C95. Cuando cierro mis ojitos', url: 'cancion_c95.html' },
        { title: 'C96. // Cuando cristo venga en gloria', url: 'cancion_c96.html' },
        { title: 'C97. Cuan gloriosa será la mañana', url: 'cancion_c97.html' },
        { title: 'C98. Cuán glorioso es el cambio', url: 'cancion_c98.html' },
        { title: 'C99. //Canten y brillen y denle a Dios la gloria//', url: 'cancion_c99.html' },
        { title: 'C100. Cantaré a Jehová nueva canción', url: 'cancion_c100.html' },
        { title: 'C101. Con óleo de alegría me has ungido', url: 'cancion_c101.html' },
        { title: 'C102. Con tu amor me has cambiado', url: 'cancion_c102.html' },
        { title: 'C103. Cada vez Señor Jesús que miro tu obra en', url: 'cancion_c103.html' },
        { title: 'C104. Cada mañana al despertar', url: 'cancion_c104.html' },
        { title: 'C105. Cantaré, te alabaré', url: 'cancion_c105.html' },
        { title: 'C106. //Canta aleluya al Señor', url: 'cancion_c106.html' },
        { title: 'C107. Cada día Cristo llena', url: 'cancion_c107.html' },
        { title: 'C108. Canta Israel a tu Dios,', url: 'cancion_c108.html' },
        { title: 'C109. Ciertamente quién como Jehová', url: 'cancion_c109.html' },
        { title: 'C110. Comienza a andar', url: 'cancion_c110.html' },
        { title: 'C111. //Con canticos de júbilo', url: 'cancion_c111.html' },
        { title: 'C112. Cerca de ti Señor quiero morar;', url: 'cancion_c112.html' },
        { title: 'C113. //Celebrad con alabanza,', url: 'cancion_c113.html' },
        { title: 'C114. Intro', url: 'cancion_c114.html' },
        { title: 'C115. Cada vez que voy', url: 'cancion_c115.html' },
        { title: 'C116. El esplendor de un Rey,', url: 'cancion_c116.html' },
        { title: 'C117. Comencé un día este', url: 'cancion_c117.html' },
        { title: 'C118. G                            F                C/E', url: 'cancion_c118.html' },
        { title: 'D1. Da la mano a tu hermano, da la mano', url: 'cancion_d1.html' },
        { title: 'D2. Dame amor oh Señor', url: 'cancion_d2.html' },
        { title: 'D3. Inicio: G  D  C', url: 'cancion_d3.html' },
        { title: 'D4. Daré gracias a ti', url: 'cancion_d4.html' },
        { title: 'D5. De este mundo ya no quiero nada', url: 'cancion_d5.html' },
        { title: 'D6. D                  A/C#      Bm      Am7 D7', url: 'cancion_d6.html' },
        { title: 'D7. INTRO. 2x', url: 'cancion_d7.html' },
        { title: 'D8. De tanto buscar por fin encontré', url: 'cancion_d8.html' },
        { title: 'D9. De todas las tribus,', url: 'cancion_d9.html' },
        { title: 'D10. Déjame ver tu reino de santidad', url: 'cancion_d10.html' },
        { title: 'D11. Desde el amanecer hasta el anochecer', url: 'cancion_d11.html' },
        { title: 'D12. Desde el levantar del sol hasta el ocaso', url: 'cancion_d12.html' },
        { title: 'D13. Desde el pronto amanecer', url: 'cancion_d13.html' },
        { title: 'D14. Intro', url: 'cancion_d14.html' },
        { title: 'D15. Desde temprano en la mañana', url: 'cancion_d15.html' },
        { title: 'D16. Día fatal será cuando no habrá lugar', url: 'cancion_d16.html' },
        { title: 'D17. Día tan grande no puedo olvidar', url: 'cancion_d17.html' },
        { title: 'D18. Digno, digno', url: 'cancion_d18.html' },
        { title: 'D19. Digno, digno es el Señor', url: 'cancion_d19.html' },
        { title: 'D20. Digno, el Cordero inmolado', url: 'cancion_d20.html' },
        { title: 'D21. Digno eres Cordero', url: 'cancion_d21.html' },
        { title: 'D22. Digno eres, de tomar el libro', url: 'cancion_d22.html' },
        { title: 'D23. G      D/F#  Em   C     Am    D', url: 'cancion_d23.html' },
        { title: 'D24. Dios es nuestro amparo,', url: 'cancion_d24.html' },
        { title: 'D25. Dios está aquí, que hermoso es', url: 'cancion_d25.html' },
        { title: 'D26. Dios está aquí', url: 'cancion_d26.html' },
        { title: 'D27. //Dios no nos trajo hasta aquí,', url: 'cancion_d27.html' },
        { title: 'D28. Dios precioso Dios,', url: 'cancion_d28.html' },
        { title: 'D29. Dispuesto está mi corazón a ti Señor', url: 'cancion_d29.html' },
        { title: 'D30. Donde está el Espíritu de Dios', url: 'cancion_d30.html' },
        { title: 'D31. Donde quiera que esté yo le alabo', url: 'cancion_d31.html' },
        { title: 'D32. Dulce comunión la que gozo ya', url: 'cancion_d32.html' },
        { title: 'D33. Dad gracias de corazón', url: 'cancion_d33.html' },
        { title: 'D34. Danos más Señor de ti este día', url: 'cancion_d34.html' },
        { title: 'D35. Debemos subir allá y tomar la tierra', url: 'cancion_d35.html' },
        { title: 'D36. Deja a Dios levantarse en tu vida', url: 'cancion_d36.html' },
        { title: 'D37. //De tus misericordias cantare', url: 'cancion_d37.html' },
        { title: 'D38. Dichoso el numero de redimidos', url: 'cancion_d38.html' },
        { title: 'D39. //Digno, digno es el Señor', url: 'cancion_d39.html' },
        { title: 'D40. A                    E/G#', url: 'cancion_d40.html' },
        { title: 'D41. Dios dió a su hijo', url: 'cancion_d41.html' },
        { title: 'D42. Dios, Dios mío eres tu', url: 'cancion_d42.html' },
        { title: 'D43. Dios esta aquí su presencia', url: 'cancion_d43.html' },
        { title: 'D44. Dios es bueno, lo cantamos', url: 'cancion_d44.html' },
        { title: 'D45. Dios manda la lluvia', url: 'cancion_d45.html' },
        { title: 'D46. Dios tan solo Dios es creador', url: 'cancion_d46.html' },
        { title: 'D47. Dios es mi Padre,', url: 'cancion_d47.html' },
        { title: 'D48. De los santos la vision es gloriosa', url: 'cancion_d48.html' },
        { title: 'D49. //Día a día te anhelo más,', url: 'cancion_d49.html' },
        { title: 'D50. Después de tanto tiempo de sequía espiritual', url: 'cancion_d50.html' },
        { title: 'D51. //Dad a Jehová la honra debida a Su nombre,', url: 'cancion_d51.html' },
        { title: 'D52. Delante de su trono todos habremos de estar', url: 'cancion_d52.html' },
        { title: 'D53. Dulce Refugio      en la tormenta', url: 'cancion_d53.html' },
        { title: 'E1. Ebenu Shalom Alejem', url: 'cancion_e1.html' },
        { title: 'E2. Edifica oh Señor el lugar de tu reposo.', url: 'cancion_e2.html' },
        { title: 'E3. El amor de Cristo, que lindo es', url: 'cancion_e3.html' },
        { title: 'E4. El atardecer se fue', url: 'cancion_e4.html' },
        { title: 'E5. D                                      Cdis', url: 'cancion_e5.html' },
        { title: 'E6. El Dios de Israel es poderoso,', url: 'cancion_e6.html' },
        { title: 'E7. VERSO 1', url: 'cancion_e7.html' },
        { title: 'E8. Él es el Rey de reyes', url: 'cancion_e8.html' },
        { title: 'E9. Él es Jehová Dios creador', url: 'cancion_e9.html' },
        { title: 'E10. Él es la Fuente de agua viva,', url: 'cancion_e10.html' },
        { title: 'E11. Él es la imagen del Dios invisible', url: 'cancion_e11.html' },
        { title: 'E12. Él es la roca cuya', url: 'cancion_e12.html' },
        { title: 'E13. El es la vid y yo la rama,', url: 'cancion_e13.html' },
        { title: 'E14. Él extendió su misericordia', url: 'cancion_e14.html' },
        { title: 'E15. El glorioso día esperado, es hoy', url: 'cancion_e15.html' },
        { title: 'E16. El gozo del Señor me fortalecerá', url: 'cancion_e16.html' },
        { title: 'E17. Él habita en la alabanza de su pueblo', url: 'cancion_e17.html' },
        { title: 'E18. Él me ha dado', url: 'cancion_e18.html' },
        { title: 'E19. Él me liberó, Él me liberó', url: 'cancion_e19.html' },
        { title: 'E20. El Nazareno sufrió por mí', url: 'cancion_e20.html' },
        { title: 'E21. El que estaba muerto resucitó', url: 'cancion_e21.html' },
        { title: 'E22. El que todo lo llena en todo', url: 'cancion_e22.html' },
        { title: 'E23. El Rey me atrajo', url: 'cancion_e23.html' },
        { title: 'E24. El Rey resucitó, su Gloria nos dejó,', url: 'cancion_e24.html' },
        { title: 'E25. Él se acercó a la tumba donde estaba yo,', url: 'cancion_e25.html' },
        { title: 'E26. El Señor es mi luz', url: 'cancion_e26.html' },
        { title: 'E27. El Señor está presente en su santuario', url: 'cancion_e27.html' },
        { title: 'E28. El Señor Jesús es mi pastor', url: 'cancion_e28.html' },
        { title: 'E29. El Señor marchando va', url: 'cancion_e29.html' },
        { title: 'E30. El Señor me llenó de gozo', url: 'cancion_e30.html' },
        { title: 'E31. El Señor resucitó aleluya, aleluya', url: 'cancion_e31.html' },
        { title: 'E32. Él vio mi viña y la vio desolada,', url: 'cancion_e32.html' },
        { title: 'E33. Él vive, él vive, Cristo vive en mí,', url: 'cancion_e33.html' },
        { title: 'E34. Elohim, Adonai,', url: 'cancion_e34.html' },
        { title: 'E35. Ellos cantan de Moisés el canto', url: 'cancion_e35.html' },
        { title: 'E36. En aquel día cantarán este cántico', url: 'cancion_e36.html' },
        { title: 'E37. En el suelo un pobre hombre esta caido', url: 'cancion_e37.html' },
        { title: 'E38. En el altar de Dios, en el altar de Dios', url: 'cancion_e38.html' },
        { title: 'E39. //En el cielo se oye', url: 'cancion_e39.html' },
        { title: 'E40. En el principio el espíritu de Dios', url: 'cancion_e40.html' },
        { title: 'E41. En esta reunión Cristo está', url: 'cancion_e41.html' },
        { title: 'E42. En Jerusalén mora nuestro Dios', url: 'cancion_e42.html' },
        { title: 'E43. En Jesús puse toda mi esperanza', url: 'cancion_e43.html' },
        { title: 'E44. // En la cruz con Cristo estoy', url: 'cancion_e44.html' },
        { title: 'E45. En la presencia de tu pueblo te alabaré', url: 'cancion_e45.html' },
        { title: 'E46. En la Roca estaré a su sombra habitaré', url: 'cancion_e46.html' },
        { title: 'E47. En la vida hay pruebas', url: 'cancion_e47.html' },
        { title: 'E48. En el cielo puedo contemplar', url: 'cancion_e48.html' },
        { title: 'E49. En medio de la congregación', url: 'cancion_e49.html' },
        { title: 'E50. En mi corazón hay banderas de amor', url: 'cancion_e50.html' },
        { title: 'E51. En mi vida gloria te doy', url: 'cancion_e51.html' },
        { title: 'E52. En momentos así levanto mi voz', url: 'cancion_e52.html' },
        { title: 'E53. En pastos verdes me apacientas', url: 'cancion_e53.html' },
        { title: 'E54. Intro:  E - Ddis', url: 'cancion_e54.html' },
        { title: 'E55. En presencia estar de Cristo', url: 'cancion_e55.html' },
        { title: 'E56. ¿En quién creíste tú?', url: 'cancion_e56.html' },
        { title: 'E57. En Sion yo pongo', url: 'cancion_e57.html' },
        { title: 'E58. En su presencia yo me puedo deleitar', url: 'cancion_e58.html' },
        { title: 'E59. Enséñame oh Dios', url: 'cancion_e59.html' },
        { title: 'E60. Enséñame oh Jehová', url: 'cancion_e60.html' },
        { title: 'E61. Entonces la iglesia se alegrará en la danza,', url: 'cancion_e61.html' },
        { title: 'E62. Entra en la presencia del Señor', url: 'cancion_e62.html' },
        { title: 'E63. Entraré por sus puertas', url: 'cancion_e63.html' },
        { title: 'E64. Entré en pacto con el Señor', url: 'cancion_e64.html' },
        { title: 'E65. Envuélveme Señor', url: 'cancion_e65.html' },
        { title: 'E66. Eran once hermanos los de José,', url: 'cancion_e66.html' },
        { title: 'E67. Eres digno de obediencia', url: 'cancion_e67.html' },
        { title: 'E68. Eres Dios del cielo, de la creación', url: 'cancion_e68.html' },
        { title: 'E69. Eres la roca de mi refugio', url: 'cancion_e69.html' },
        { title: 'E70. Eres mi protector, llenas mi corazón', url: 'cancion_e70.html' },
        { title: 'E71. Eres mi sanador, mi consolador,', url: 'cancion_e71.html' },
        { title: 'E72. Eres todo para mí grande eres tú Señor', url: 'cancion_e72.html' },
        { title: 'E73. Es agua viva, es agua viva', url: 'cancion_e73.html' },
        { title: 'E74. Es el León de la tribu de Judá', url: 'cancion_e74.html' },
        { title: 'E75. Es mi mandamiento', url: 'cancion_e75.html' },
        { title: 'E76. Escucha esta triste canción', url: 'cancion_e76.html' },
        { title: 'E77. Escúchame porque a ti he clamado', url: 'cancion_e77.html' },
        { title: 'E78. Esperaré delante de mi Señor,', url: 'cancion_e78.html' },
        { title: 'E79. Espíritu de Dios llena mi vida,', url: 'cancion_e79.html' },
        { title: 'E80. Esta obra no va a parar', url: 'cancion_e80.html' },
        { title: 'E81. Estamos de fiesta con Jesús', url: 'cancion_e81.html' },
        { title: 'E82. Estamos juntos otra vez alabando al Señor', url: 'cancion_e82.html' },
        { title: 'E83. Estamos parados en lugar sagrado', url: 'cancion_e83.html' },
        { title: 'E84. Estamos todos reunidos', url: 'cancion_e84.html' },
        { title: 'E85. Éste es el Cristo que yo predico', url: 'cancion_e85.html' },
        { title: 'E86. Éste es el día, éste es el día', url: 'cancion_e86.html' },
        { title: 'E87. Este gozo que yo siento en mi alma,', url: 'cancion_e87.html' },
        { title: 'E88. Estoy alegre por que soy de Cristo', url: 'cancion_e88.html' },
        { title: 'E89. Exaltad a Jehová nuestro Dios.', url: 'cancion_e89.html' },
        { title: 'E90. Exalto a Cristo', url: 'cancion_e90.html' },
        { title: 'E91. Examíname oh Dios, examíname Señor', url: 'cancion_e91.html' },
        { title: 'E92. Porque es', url: 'cancion_e92.html' },
        { title: 'E93. Él es Jehová Dios de la creación', url: 'cancion_e93.html' },
        { title: 'E94. El nos llama a brillar', url: 'cancion_e94.html' },
        { title: 'E95. El señor mi Dios en medio', url: 'cancion_e95.html' },
        { title: 'E96. Eres la roca de mi refugio', url: 'cancion_e96.html' },
        { title: 'E97. Esa paz que yo siento en mi alma', url: 'cancion_e97.html' },
        { title: 'E98. Estamos de fiesta', url: 'cancion_e98.html' },
        { title: 'E99. Escucha oh Jehova', url: 'cancion_e99.html' },
        { title: 'E100. Escucha Jehová mi causa justa', url: 'cancion_e100.html' },
        { title: 'E101. Este el día    de alabanza', url: 'cancion_e101.html' },
        { title: 'E102. Estoy alegre ¿Por qué estas alegre?', url: 'cancion_e102.html' },
        { title: 'E103. En las olas inmensas', url: 'cancion_e103.html' },
        { title: 'E104. Era como una oveja descarriada', url: 'cancion_e104.html' },
        { title: 'E105. Enséñame Espíritu a orar,', url: 'cancion_e105.html' },
        { title: 'E106. //Escucha Señor mi corazón', url: 'cancion_e106.html' },
        { title: 'E107. En medio de la alabanza el Espíritu de Dios', url: 'cancion_e107.html' },
        { title: 'E108. El mundo dice', url: 'cancion_e108.html' },
        { title: 'E109. En Egipto esclavo fui, si, si, oh si', url: 'cancion_e109.html' },
        { title: 'E110. Libre tú me hiciste libre', url: 'cancion_e110.html' },
        { title: 'E111. Y ahora que libre soy si, si, oh si', url: 'cancion_e111.html' },
        { title: 'E112. Enséñame a amarte', url: 'cancion_e112.html' },
        { title: 'E113. Estamos agradecidos', url: 'cancion_e113.html' },
        { title: 'E114. Am                       A7/C#    Dm', url: 'cancion_e114.html' },
        { title: 'E115. Exalta al Rey de gloria', url: 'cancion_e115.html' },
        { title: 'E116. En el Sinaí Jehová descendió', url: 'cancion_e116.html' },
        { title: 'E117. Examíname oh Dios y conoce mi corazón', url: 'cancion_e117.html' },
        { title: 'E118. El amor de Dios es maravilloso', url: 'cancion_e118.html' },
        { title: 'E119. Eran cien ovejas que había en el rebaño,', url: 'cancion_e119.html' },
        { title: 'E120. Este pueblo que has formado,', url: 'cancion_e120.html' },
        { title: 'E121. Éste es Jehová el Dios verdadero', url: 'cancion_e121.html' },
        { title: 'E122. En el monte Calvario estaba una cruz,', url: 'cancion_e122.html' },
        { title: 'E123. Enviado soy de Dios mis manos listan están', url: 'cancion_e123.html' },
        { title: 'E124. GUITARRA: CAPO EN 1ER TRASTE', url: 'cancion_e124.html' },
        { title: 'E125. Eres Dios de Abraham,', url: 'cancion_e125.html' },
        { title: 'E126. E              B/D#           C#m', url: 'cancion_e126.html' },
        { title: 'F1. Fija tus ojos en Cristo', url: 'cancion_f1.html' },
        { title: 'F2. Fuerte Dios, vencedor,', url: 'cancion_f2.html' },
        { title: 'F3. Fuerte y poderoso eres tú Señor', url: 'cancion_f3.html' },
        { title: 'F4. Firmes y adelante', url: 'cancion_f4.html' },
        { title: 'F5. Fuente de la vida eterna', url: 'cancion_f5.html' },
        { title: 'F6. Frente a Ti se unirán por hoy y siempre', url: 'cancion_f6.html' },
        { title: 'G1. Gloria a Cristo gloria', url: 'cancion_g1.html' },
        { title: 'G2. Glora a ti Jesús divino', url: 'cancion_g2.html' },
        { title: 'G3. Gloria al nombre de Cristo', url: 'cancion_g3.html' },
        { title: 'G4. Gloria al Padre', url: 'cancion_g4.html' },
        { title: 'G5. Gloria al Rey, Rey Santo y Justo', url: 'cancion_g5.html' },
        { title: 'G6. Gloria, gloria a tu nombre Señor Jesús', url: 'cancion_g6.html' },
        { title: 'G7. Gozaos en el Señor', url: 'cancion_g7.html' },
        { title: 'G8. Gracias a Dios por las flores,', url: 'cancion_g8.html' },
        { title: 'G9. Gracias porque estamos juntos', url: 'cancion_g9.html' },
        { title: 'G10. Gracias yo te doy a ti', url: 'cancion_g10.html' },
        { title: 'G11. Grande es el Señor,', url: 'cancion_g11.html' },
        { title: 'G12. Grande es el Señor y digno de adoración', url: 'cancion_g12.html' },
        { title: 'G13. Grandes y admirables son todas', url: 'cancion_g13.html' },
        { title: 'G14. Grandes y maravillosas son tus obras', url: 'cancion_g14.html' },
        { title: 'G15. Guárdame como a la niña de tus ojos', url: 'cancion_g15.html' },
        { title: 'G16. Gloria al Señor por siempre', url: 'cancion_g16.html' },
        { title: 'G17. // Glorificad a Jehová', url: 'cancion_g17.html' },
        { title: 'G18. Gracias mi Dios por darte a mi', url: 'cancion_g18.html' },
        { title: 'G19. Gracias Señor te damos', url: 'cancion_g19.html' },
        { title: 'G20. Gloria, gloria aleluya', url: 'cancion_g20.html' },
        { title: 'G21. Gracias Cristo, gracias Cristo,', url: 'cancion_g21.html' },
        { title: 'H1. Ha resucitado, ha resucitado', url: 'cancion_h1.html' },
        { title: 'H2. Hablaré a mis hermanos', url: 'cancion_h2.html' },
        { title: 'H3. Hacer tu voluntad Señor me ha agradado', url: 'cancion_h3.html' },
        { title: 'H4. Has cambiado hoy mi ser', url: 'cancion_h4.html' },
        { title: 'H5. Has cambiado mi lamento en baile Señor', url: 'cancion_h5.html' },
        { title: 'H6. Has sido tan bueno conmigo', url: 'cancion_h6.html' },
        { title: 'H7. Hasta aquí', url: 'cancion_h7.html' },
        { title: 'H8. Hay cosas que no comprenderé,', url: 'cancion_h8.html' },
        { title: 'H9. // Hay momentos que las palabras', url: 'cancion_h9.html' },
        { title: 'H10. Hay muchas historias en la Biblia', url: 'cancion_h10.html' },
        { title: 'H11. Hay poder, poder sin igual poder', url: 'cancion_h11.html' },
        { title: 'H12. Hay un poder que consume', url: 'cancion_h12.html' },
        { title: 'H13. Hay un pueblo que te ama', url: 'cancion_h13.html' },
        { title: 'H14. // Hay un pueblo que vive muy feliz', url: 'cancion_h14.html' },
        { title: 'H15. Hay una senda que el mundo no conoce', url: 'cancion_h15.html' },
        { title: 'H16. Hay vida, hay vida en Jesús', url: 'cancion_h16.html' },
        { title: 'H17. He de confiar en Jesús en mi vida sí', url: 'cancion_h17.html' },
        { title: 'H18. He decidido seguir a Cristo', url: 'cancion_h18.html' },
        { title: 'H19. He decidido seguir al Cordero de Dios,', url: 'cancion_h19.html' },
        { title: 'H20. He decidido seguirte Señor', url: 'cancion_h20.html' },
        { title: 'H21. He sido libre oh gloria a Dios,', url: 'cancion_h21.html' },
        { title: 'H22. Heme aqui yo iré Señor,', url: 'cancion_h22.html' },
        { title: 'H23. Hijo de Dios te alabamos', url: 'cancion_h23.html' },
        { title: 'H24. Hosanna, Hosanna,', url: 'cancion_h24.html' },
        { title: 'H25. Hoy recordé oh Dios', url: 'cancion_h25.html' },
        { title: 'H26. Hoy te bendigo mi Señor,', url: 'cancion_h26.html' },
        { title: 'H27. Hoy tu voz escuche', url: 'cancion_h27.html' },
        { title: 'H28. Hoy vengo a derramar mi perfume ante ti', url: 'cancion_h28.html' },
        { title: 'H29. Humíllate en la presencia del Señor', url: 'cancion_h29.html' },
        { title: 'H30. Halle un buen amigo', url: 'cancion_h30.html' },
        { title: 'H31. Hay victoria, hay victoria', url: 'cancion_h31.html' },
        { title: 'H32. He decidido seguir a Cristo  3V', url: 'cancion_h32.html' },
        { title: 'H33. Hacer tu voluntad señor', url: 'cancion_h33.html' },
        { title: 'H34. // Oh, oh, oh, oh, hosanna', url: 'cancion_h34.html' },
        { title: 'H35. Hoy declaro con mis labios', url: 'cancion_h35.html' },
        { title: 'H36. Hoy tengo paz y gozo', url: 'cancion_h36.html' },
        { title: 'H37. Hemos sido llamados', url: 'cancion_h37.html' },
        { title: 'H38. Has ganado la victoria', url: 'cancion_h38.html' },
        { title: 'H39. Hoy vengo Señor', url: 'cancion_h39.html' },
        { title: 'J1. Jehová el Señor', url: 'cancion_j1.html' },
        { title: 'J2. Jehová enviará de Sion', url: 'cancion_j2.html' },
        { title: 'J3. Jehová es mi roca y mi fortaleza', url: 'cancion_j3.html' },
        { title: 'J4. Jehová es varón de guerra,', url: 'cancion_j4.html' },
        { title: 'J5. Jehová está en medio de ti', url: 'cancion_j5.html' },
        { title: 'J6. Jehová está en su templo', url: 'cancion_j6.html' },
        { title: 'J7. Jehová se ha vestido de poder', url: 'cancion_j7.html' },
        { title: 'J8. Jehová tú eres mi Dios', url: 'cancion_j8.html' },
        { title: 'J9. Jesucristo, prepárame en holocausto', url: 'cancion_j9.html' },
        { title: 'J10. Jesucristo reina, reina ya,', url: 'cancion_j10.html' },
        { title: 'J11. Jesús eres mi Dios, mi sol, mi sombra', url: 'cancion_j11.html' },
        { title: 'J12. // Jesús es el camino al cielo', url: 'cancion_j12.html' },
        { title: 'J13. Jesús es mi Rey soberano', url: 'cancion_j13.html' },
        { title: 'J14. Jesús, Jesús eres todo para mí', url: 'cancion_j14.html' },
        { title: 'J15. Jesús mi Dios, hoy vengo a ti', url: 'cancion_j15.html' },
        { title: 'J16. Jehová reina, Jehová reina', url: 'cancion_j16.html' },
        { title: 'J17. Jesús te amo, Señor te adoro,', url: 'cancion_j17.html' },
        { title: 'J18. Jesús tomó mi vida en sus manos', url: 'cancion_j18.html' },
        { title: 'J19. Jesús viene en las nubes su iglesia', url: 'cancion_j19.html' },
        { title: 'J20. José un día a sus hermanos fue a buscar', url: 'cancion_j20.html' },
        { title: 'J21. Judá primero y la batalla se ganará,', url: 'cancion_j21.html' },
        { title: 'J22. Junto a la cruz do Jesús murió', url: 'cancion_j22.html' },
        { title: 'J23. Jehová es mi roca y mi fortaleza', url: 'cancion_j23.html' },
        { title: 'J24. Jesucristo me ha liberado', url: 'cancion_j24.html' },
        { title: 'J25. Jesús bajó del cielo', url: 'cancion_j25.html' },
        { title: 'J26. Jesús con su gran amor', url: 'cancion_j26.html' },
        { title: 'J27. Jesús me escogiste antes', url: 'cancion_j27.html' },
        { title: 'J28. // Jesús yo te amo //', url: 'cancion_j28.html' },
        { title: 'J29. Jesús Señor de la creación,', url: 'cancion_j29.html' },
        { title: 'J30. //Jehová es mi luz y mi salvación', url: 'cancion_j30.html' },
        { title: 'L1. La fuente del cielo fluyendo agua está,', url: 'cancion_l1.html' },
        { title: 'L2. La gloria de Jehová cayó en el Sinaí', url: 'cancion_l2.html' },
        { title: 'L3. La iglesia está llena de tu gloria', url: 'cancion_l3.html' },
        { title: 'L4. La ley de Jehová es perfecta', url: 'cancion_l4.html' },
        { title: 'L5. G             D/F#                Em', url: 'cancion_l5.html' },
        { title: 'L6. La sangre de Cristo', url: 'cancion_l6.html' },
        { title: 'L7. La vida en Jesús, Aleluya', url: 'cancion_l7.html' },
        { title: 'L8. La vida eterna eres tú', url: 'cancion_l8.html' },
        { title: 'L9. Las aves ya no cantan', url: 'cancion_l9.html' },
        { title: 'L10. Las cuerdas me cayeron,', url: 'cancion_l10.html' },
        { title: 'L11. Las estrellitas que están en el cielo', url: 'cancion_l11.html' },
        { title: 'L12. Bm                        Bm/A               G', url: 'cancion_l12.html' },
        { title: 'L13. La vida en Cristo es muy hermosa', url: 'cancion_l13.html' },
        { title: 'L14. La tierra está llena', url: 'cancion_l14.html' },
        { title: 'L15. Levanta tu casa sobre la Roca', url: 'cancion_l15.html' },
        { title: 'L16. Levantamos tu nombre,', url: 'cancion_l16.html' },
        { title: 'L17. Levantaré mi voz', url: 'cancion_l17.html' },
        { title: 'L18. Intro:', url: 'cancion_l18.html' },
        { title: 'L19. Levántate, oh amado mío', url: 'cancion_l19.html' },
        { title: 'L20. Levántate Señor', url: 'cancion_l20.html' },
        { title: 'L21. Levántate Señor', url: 'cancion_l21.html' },
        { title: 'L22. Levántate y canta oh hija de Sion', url: 'cancion_l22.html' },
        { title: 'L23. Levántate y sálvame Señor', url: 'cancion_l23.html' },
        { title: 'L24. A               AMaj7', url: 'cancion_l24.html' },
        { title: 'L25. Libre me hiciste Señor', url: 'cancion_l25.html' },
        { title: 'L26. Libre para alabarte, yo soy libre', url: 'cancion_l26.html' },
        { title: 'L27. Libre tú me hiciste libre', url: 'cancion_l27.html' },
        { title: 'L28. Limpia mi conciencia', url: 'cancion_l28.html' },
        { title: 'L29. Lléname, lléname', url: 'cancion_l29.html' },
        { title: 'L30. Lo que respira alabe a Jehová,', url: 'cancion_l30.html' },
        { title: 'L31. Los cielos proclaman', url: 'cancion_l31.html' },
        { title: 'L32. Los dioses de este mundo', url: 'cancion_l32.html' },
        { title: 'L33. Los hijos de Sion se gozan en su Rey,', url: 'cancion_l33.html' },
        { title: 'L34. Los israelitas dieron siete vueltas', url: 'cancion_l34.html' },
        { title: 'L35. Los muros caen, los muros caen', url: 'cancion_l35.html' },
        { title: 'L36. Los que confían en Jehová,', url: 'cancion_l36.html' },
        { title: 'L37. Los que esperan en Jehová', url: 'cancion_l37.html' },
        { title: 'L38. Los que esperan,', url: 'cancion_l38.html' },
        { title: 'L39. // Levántate y resplandece', url: 'cancion_l39.html' },
        { title: 'L40. La vida es una fantasía', url: 'cancion_l40.html' },
        { title: 'L41. Lavadas ya mis manos', url: 'cancion_l41.html' },
        { title: 'L42. Levantémonos hermanos', url: 'cancion_l42.html' },
        { title: 'L43. La gente de nuestro tiempo', url: 'cancion_l43.html' },
        { title: 'L44. // Levántate en el nombre de Cristo', url: 'cancion_l44.html' },
        { title: 'L45. La misma fe, el mismo amor', url: 'cancion_l45.html' },
        { title: 'M1. Majestad, gloria a su majestad', url: 'cancion_m1.html' },
        { title: 'M2. Maravilloso Dios', url: 'cancion_m2.html' },
        { title: 'M3. Más allá del cielo tenemos que ir', url: 'cancion_m3.html' },
        { title: 'M4. Más de ti, quiero vivirte más en mí.', url: 'cancion_m4.html' },
        { title: 'M5. Mas no habrá siempre', url: 'cancion_m5.html' },
        { title: 'M6. Más que el centinela a la mañana,', url: 'cancion_m6.html' },
        { title: 'M7. Mas tú sacaste', url: 'cancion_m7.html' },
        { title: 'M8. Me alegraré, ¡Hey!', url: 'cancion_m8.html' },
        { title: 'M9. D                          Cdis             Em', url: 'cancion_m9.html' },
        { title: 'M10. Me  gozaré,         me alegraré', url: 'cancion_m10.html' },
        { title: 'M11. Me ha mostrado, el Señor', url: 'cancion_m11.html' },
        { title: 'M12. Em                            Am       Am/G', url: 'cancion_m12.html' },
        { title: 'M13. Me has ungido a mí', url: 'cancion_m13.html' },
        { title: 'M14. Me hirió el pecado fui a Jesús', url: 'cancion_m14.html' },
        { title: 'M15. Me levantaré y saldré', url: 'cancion_m15.html' },
        { title: 'M16. Me librará del cazador', url: 'cancion_m16.html' },
        { title: 'M17. Me ofrezco Señor en sacrificio a ti', url: 'cancion_m17.html' },
        { title: 'M18. Me sedujiste oh Jehová y fui seducido,', url: 'cancion_m18.html' },
        { title: 'M19. C                     Em7/B', url: 'cancion_m19.html' },
        { title: 'M20. Mi confianza he puesto en ti, sólo en ti,', url: 'cancion_m20.html' },
        { title: 'M21. Mi corazón dispuesto está', url: 'cancion_m21.html' },
        { title: 'M22. Mi fe descansa en Jesús,', url: 'cancion_m22.html' },
        { title: 'M23. Mi corazón he fijado en ti Señor', url: 'cancion_m23.html' },
        { title: 'M24. Mi Dios poderoso', url: 'cancion_m24.html' },
        { title: 'M25. Mi juventud Señor es para ti', url: 'cancion_m25.html' },
        { title: 'M26. Mi paz te doy a ti', url: 'cancion_m26.html' },
        { title: 'M27. Mi salvación es Jehová,', url: 'cancion_m27.html' },
        { title: 'M28. Mi Señor me demostró el amor', url: 'cancion_m28.html' },
        { title: 'M29. //Mira que lindo, que lindo es el Señor.', url: 'cancion_m29.html' },
        { title: 'M30. Mirad cual amor nos ha dado', url: 'cancion_m30.html' },
        { title: 'M31. //Mirad cuán bueno y delicioso es', url: 'cancion_m31.html' },
        { title: 'M32. Mis pecados son borrados ya', url: 'cancion_m32.html' },
        { title: 'M33. Majestuoso poderoso', url: 'cancion_m33.html' },
        { title: 'M34. Mi Dios reina', url: 'cancion_m34.html' },
        { title: 'M35. Mi querido Jesús', url: 'cancion_m35.html' },
        { title: 'M36. Mi Cristo, mi Rey', url: 'cancion_m36.html' },
        { title: 'M37. A                                     *', url: 'cancion_m37.html' },
        { title: 'M38. Mi Dios es tan grande', url: 'cancion_m38.html' },
        { title: 'M39. Muy lejos yo vagué de Dios,', url: 'cancion_m39.html' },
        { title: 'M40. Me encuentro en ti, alegre estoy', url: 'cancion_m40.html' },
        { title: 'M41. Me gozaré en tu presencia Jehová', url: 'cancion_m41.html' },
        { title: 'M42. Me has tomado en tus brazos', url: 'cancion_m42.html' },
        { title: 'M43. D         A/D    G   D      G    D/F#      A7 Majestuoso, Poderoso, digno  de  loor.', url: 'cancion_m43.html' },
        { title: 'N1. Nada en la vida mi Señor', url: 'cancion_n1.html' },
        { title: 'N2. No daré mi vida a nadie más que a ti.', url: 'cancion_n2.html' },
        { title: 'N3. No descansaré', url: 'cancion_n3.html' },
        { title: 'N4. No está la gloria en la sabiduría,', url: 'cancion_n4.html' },
        { title: 'N5. // No hay Dios tan grande como tú.', url: 'cancion_n5.html' },
        { title: 'N6. No hay problema tan grande', url: 'cancion_n6.html' },
        { title: 'N7. No hay Santo como Jehová,', url: 'cancion_n7.html' },
        { title: 'N8. No me importa de dónde tú vengas', url: 'cancion_n8.html' },
        { title: 'N9. No me pidas que me vaya', url: 'cancion_n9.html' },
        { title: 'N10. No puede estar triste', url: 'cancion_n10.html' },
        { title: 'N11. No sé porque Señor tú me tocaste.', url: 'cancion_n11.html' },
        { title: 'N12. No te avergüences y alaba a tu Señor.', url: 'cancion_n12.html' },
        { title: 'N13. No temáis manada pequeña', url: 'cancion_n13.html' },
        { title: 'N14. D                                      A/C#', url: 'cancion_n14.html' },
        { title: 'N15. Noble sostén de la esperanza mía', url: 'cancion_n15.html' },
        { title: 'N16. Nos levantaremos con él', url: 'cancion_n16.html' },
        { title: 'N17. Nuestro Dios hizo los cielos', url: 'cancion_n17.html' },
        { title: 'N18. Nunca jamás me olvidaré', url: 'cancion_n18.html' },
        { title: 'N19. Nunca, nunca Cristo me ha dejado.', url: 'cancion_n19.html' },
        { title: 'N20. No hay Dios mayor', url: 'cancion_n20.html' },
        { title: 'N21. // No duerme el que cuida', url: 'cancion_n21.html' },
        { title: 'N22. No temas contender por la fe', url: 'cancion_n22.html' },
        { title: 'N23. Nuestro Dios tiene poder', url: 'cancion_n23.html' },
        { title: 'N24. //Nuestro Dios grande y poderoso', url: 'cancion_n24.html' },
        { title: 'N25. No conozco el futuro', url: 'cancion_n25.html' },
        { title: 'N26. Nunca pasó por su mente', url: 'cancion_n26.html' },
        { title: 'O1. Oh bendigan al Señor', url: 'cancion_o1.html' },
        { title: 'O2. Oh deja que el Señor te envuelva', url: 'cancion_o2.html' },
        { title: 'O3. Oh Dios Eterno, tu misericordia', url: 'cancion_o3.html' },
        { title: 'O4. Oh, Dios de mi alma, sé tú mi visión,', url: 'cancion_o4.html' },
        { title: 'O5. Oh Jehová he oído tu palabra y temí', url: 'cancion_o5.html' },
        { title: 'O6. Oh Jehová, mira al que se dice tu pueblo,', url: 'cancion_o6.html' },
        { title: 'O7. Oh Jehová, muchos', url: 'cancion_o7.html' },
        { title: 'O8. Oh Jerusalén que bonita eres,', url: 'cancion_o8.html' },
        { title: 'O9. Oh Jesucristo quiero decirte,', url: 'cancion_o9.html' },
        { title: 'O10. Oh, la Gloria de tu presencia', url: 'cancion_o10.html' },
        { title: 'O11. Oh, oh, oh, ven Señor Jesús', url: 'cancion_o11.html' },
        { title: 'O12. Oh, Señor Jesús,', url: 'cancion_o12.html' },
        { title: 'O13. Oh Señor Jesús quiero verte a ti en Sion', url: 'cancion_o13.html' },
        { title: 'O14. Oh Señor ya te he encontrado,', url: 'cancion_o14.html' },
        { title: 'O15. Oh si tú supieras amigo,', url: 'cancion_o15.html' },
        { title: 'O16. Oh Sion, Sion', url: 'cancion_o16.html' },
        { title: 'O17. Oh, ven a las cámaras reales', url: 'cancion_o17.html' },
        { title: 'O18. Oí tu voz que me decía: a quién enviaré', url: 'cancion_o18.html' },
        { title: 'O19. Orando sin cesar venceremos', url: 'cancion_o19.html' },
        { title: 'O20. Otra vez abriré ríos en el desierto,', url: 'cancion_o20.html' },
        { title: 'O21. Oye oh Dios mi clamor', url: 'cancion_o21.html' },
        { title: 'O22. // oh Jehová señor nuestro', url: 'cancion_o22.html' },
        { title: 'O23. // oh, oh, oh, oh, hosanna', url: 'cancion_o23.html' },
        { title: 'O24. Oh, Señor inclina tu oído a mi voz', url: 'cancion_o24.html' },
        { title: 'O25. Oh Jehová, tu me has examinado', url: 'cancion_o25.html' },
        { title: 'O26. Oh Dios de mi al - ma, sé tú mi  vi - sión,', url: 'cancion_o26.html' },
        { title: 'O27. Oh divino amor', url: 'cancion_o27.html' },
        { title: 'O28. Oh, oh, oh ven.', url: 'cancion_o28.html' },
        { title: 'O29. Oh Señor queremos unir nuestras', url: 'cancion_o29.html' },
        { title: 'O30. Oh, Dios tú eres mi Dios fuerte', url: 'cancion_o30.html' },
        { title: 'O31. //Oh moradora de Sion alaba a Jehová', url: 'cancion_o31.html' },
        { title: 'P1. Padre te adoramos', url: 'cancion_p1.html' },
        { title: 'P2. Padre te amo, te alabo, te adoro', url: 'cancion_p2.html' },
        { title: 'P3. Para hacer  mi corazón', url: 'cancion_p3.html' },
        { title: 'P4. //Para ti oh Jehová,', url: 'cancion_p4.html' },
        { title: 'P5. Pelearán contra el Cordero', url: 'cancion_p5.html' },
        { title: 'P6. G                                        D/F#', url: 'cancion_p6.html' },
        { title: 'P7. Pídeme lo que quieras sin temor', url: 'cancion_p7.html' },
        { title: 'P8. Pon aceite en mi lámpara Señor', url: 'cancion_p8.html' },
        { title: 'P9. Pon en mi boca oh Señor', url: 'cancion_p9.html' },
        { title: 'P10. Pon tu corazón en mí oh Jesús', url: 'cancion_p10.html' },
        { title: 'P11. Ponte el manto de gozo en vez de tristeza', url: 'cancion_p11.html' },
        { title: 'P12. Por amor de Sion no callaré', url: 'cancion_p12.html' },
        { title: 'P13. A                   E/G#              F#m', url: 'cancion_p13.html' },
        { title: 'P14. Por cierto la presencia del Señor está aquí,', url: 'cancion_p14.html' },
        { title: 'P15. Por cuanto Dios amó', url: 'cancion_p15.html' },
        { title: 'P16. Por la gracia de Dios, soy lo que soy,', url: 'cancion_p16.html' },
        { title: 'P17. Por mucho tiempo el pueblo de Dios', url: 'cancion_p17.html' },
        { title: 'P18. ¿Por qué buscáis', url: 'cancion_p18.html' },
        { title: 'P19. Porque he levantado mi voz de mañana,', url: 'cancion_p19.html' },
        { title: 'P20. Porque tanto amó Dios al mundo', url: 'cancion_p20.html' },
        { title: 'P21. Porque tú eres bueno', url: 'cancion_p21.html' },
        { title: 'P22. Porque tú oh Dios en lo alto estás', url: 'cancion_p22.html' },
        { title: 'P23. U1.', url: 'cancion_p23.html' },
        { title: 'P24. Pueblo mío escucha hoy,', url: 'cancion_p24.html' },
        { title: 'P25. Pueblos todos batid las manos', url: 'cancion_p25.html' },
        { title: 'P26. Puedo levantar mis manos', url: 'cancion_p26.html' },
        { title: 'P27. Pues tú has librado', url: 'cancion_p27.html' },
        { title: 'P28. Pues yo nací para ser', url: 'cancion_p28.html' },
        { title: 'P29. C        G/B   Am                  F', url: 'cancion_p29.html' },
        { title: 'P30. Padre del cielo te adoramos', url: 'cancion_p30.html' },
        { title: 'P31. Padre perdóname, ayúdame', url: 'cancion_p31.html' },
        { title: 'P32. Pecador ven a Cristo Jesús', url: 'cancion_p32.html' },
        { title: 'P33. Por los montes y los valles', url: 'cancion_p33.html' },
        { title: 'P34. Padre te bendecimos', url: 'cancion_p34.html' },
        { title: 'P35. Por tu amor tu diste tu vida', url: 'cancion_p35.html' },
        { title: 'P36. Poderosa fue la mano de Dios', url: 'cancion_p36.html' },
        { title: 'P37. Padre, oh Dios y padre', url: 'cancion_p37.html' },
        { title: 'P38. //Porque grande fue su amor por ti', url: 'cancion_p38.html' },
        { title: 'P39. Por el sol de mañana', url: 'cancion_p39.html' },
        { title: 'P40. Inicia en “D”', url: 'cancion_p40.html' },
        { title: 'P41. Proclamemos con gozo', url: 'cancion_p41.html' },
        { title: 'P42. Pedid por la paz', url: 'cancion_p42.html' },
        { title: 'Q1. Que glorioso es andar con él', url: 'cancion_q1.html' },
        { title: 'Q2. Que alegre, que alegre,', url: 'cancion_q2.html' },
        { title: 'Q3. Que el rocío de los cielos', url: 'cancion_q3.html' },
        { title: 'Q4. Que grande salvación has traído a mi vida', url: 'cancion_q4.html' },
        { title: 'Q5. Que misericordia ha hecho el Señor', url: 'cancion_q5.html' },
        { title: 'Q6. Que no se acabe el gozo', url: 'cancion_q6.html' },
        { title: 'Q7. 130BPM', url: 'cancion_q7.html' },
        { title: 'Q8. ¿Quién como tú? ¿Quién como tú?', url: 'cancion_q8.html' },
        { title: 'Q9. ¿Quién como tú?', url: 'cancion_q9.html' },
        { title: 'Q10. Quién irá por nosotros', url: 'cancion_q10.html' },
        { title: 'Q11. Quién me separará de ti Señor,', url: 'cancion_q11.html' },
        { title: 'Q12. Quién nos separará del amor del Señor.', url: 'cancion_q12.html' },
        { title: 'Q13. ¿Quién nos separará', url: 'cancion_q13.html' },
        { title: 'Q14. //Quién, quién, quién como Jehová,', url: 'cancion_q14.html' },
        { title: 'Q15. Quiero alabarte más y más Señor,', url: 'cancion_q15.html' },
        { title: 'Q16. Quiero cantar una linda canción,', url: 'cancion_q16.html' },
        { title: 'Q17. Quiero disponer mi corazón', url: 'cancion_q17.html' },
        { title: 'Q18. Quiero gritar mi necesidad', url: 'cancion_q18.html' },
        { title: 'Q19. Quiero levantar mis manos,', url: 'cancion_q19.html' },
        { title: 'Q20. Quiero llenar tu trono de alabanza,', url: 'cancion_q20.html' },
        { title: 'Q21. Quiero ser   obrero de tu viña', url: 'cancion_q21.html' },
        { title: 'Q22. Quitado fue de aquella cruz', url: 'cancion_q22.html' },
        { title: 'Q23. Quiero alabarte mas y mas Señor', url: 'cancion_q23.html' },
        { title: 'Q24. Que puede haber más hermoso que Jesús.', url: 'cancion_q24.html' },
        { title: 'Q25. Quiero amarte oh Jesús', url: 'cancion_q25.html' },
        { title: 'Q26. ¿Qué me puede dar perdón?', url: 'cancion_q26.html' },
        { title: 'Q27. S', url: 'cancion_q27.html' },
        { title: 'Q28. ¿Qué niño es éste que al dormir', url: 'cancion_q28.html' },
        { title: 'Q29. “Siempre Juntos”', url: 'cancion_q29.html' },
        { title: 'Q30. G            D/F#   Em     D', url: 'cancion_q30.html' },
        { title: 'Q31. Quiero escuchar tu dulce voz', url: 'cancion_q31.html' },
        { title: 'Q32. // Que todo lo que soy', url: 'cancion_q32.html' },
        { title: 'Q33. ¿Qué amor mis pecados', url: 'cancion_q33.html' },
        { title: 'R1. Rebosando de gozo te alabaré', url: 'cancion_r1.html' },
        { title: 'R2. Regocijaos, regocijaos, regocijaos', url: 'cancion_r2.html' },
        { title: 'R3. //Regocíjate Sion grita, canta', url: 'cancion_r3.html' },
        { title: 'R4. Regocíjate y canta', url: 'cancion_r4.html' },
        { title: 'R5. Renuévame Señor Jesús', url: 'cancion_r5.html' },
        { title: 'R6. Restauración quiero Señor', url: 'cancion_r6.html' },
        { title: 'R7. Restaurarás el santo lugar', url: 'cancion_r7.html' },
        { title: 'R8. Rey de Reyes y Señor de Señores', url: 'cancion_r8.html' },
        { title: 'R9. Rey glorioso eres tú maravilloso', url: 'cancion_r9.html' },
        { title: 'R10. Razón de vivir me diste', url: 'cancion_r10.html' },
        { title: 'R11. Rey         soberano', url: 'cancion_r11.html' },
        { title: 'R12. //Regocíjate y canta moradora de Sion', url: 'cancion_r12.html' },
        { title: 'S1. ¿Sabías que eres especial?', url: 'cancion_s1.html' },
        { title: 'S2. Saliendo del pretorio', url: 'cancion_s2.html' },
        { title: 'S3. Salta, oh fuente salta,', url: 'cancion_s3.html' },
        { title: 'S4. Salvo soy, salvo soy', url: 'cancion_s4.html' },
        { title: 'S5. Santo de Israel mira la aflicción', url: 'cancion_s5.html' },
        { title: 'S6. Santo el más Santo', url: 'cancion_s6.html' },
        { title: 'S7. Santo Espíritu llena mi vida', url: 'cancion_s7.html' },
        { title: 'S8. Santo, Santo, Santo, Santo, eres Señor.', url: 'cancion_s8.html' },
        { title: 'S9. Santo, Santo, Santo, Santo', url: 'cancion_s9.html' },
        { title: 'S10. Santo, Santo, Santo Dios', url: 'cancion_s10.html' },
        { title: 'S11. Santo, Santo, Santo es el Cordero.', url: 'cancion_s11.html' },
        { title: 'S12. Santo, Santo, Santo es el Señor.', url: 'cancion_s12.html' },
        { title: 'S13. Santo, Santo, Santo', url: 'cancion_s13.html' },
        { title: 'S14. Satúrame Señor con tu Espíritu,', url: 'cancion_s14.html' },
        { title: 'S15. Se oye su voz aunque distante espera', url: 'cancion_s15.html' },
        { title: 'S16. Sembraré la simiente preciosa', url: 'cancion_s16.html' },
        { title: 'S17. Señor de amor has ganado mi corazón', url: 'cancion_s17.html' },
        { title: 'S18. Señor de que sirve tener todo en la vida', url: 'cancion_s18.html' },
        { title: 'S19. Señor Jesús yo quiero ser como tú', url: 'cancion_s19.html' },
        { title: 'S20. Señor llévame a tus atrios', url: 'cancion_s20.html' },
        { title: 'S21. Señor me miraste,', url: 'cancion_s21.html' },
        { title: 'S22. Señor me tomaste', url: 'cancion_s22.html' },
        { title: 'S23. Señor mi Dios, al contemplar los cielos', url: 'cancion_s23.html' },
        { title: 'S24. Señor mi Dios en medio de mí', url: 'cancion_s24.html' },
        { title: 'S25. Señor mi Dios te alzamos el corazón,', url: 'cancion_s25.html' },
        { title: 'S26. Señor prepárame a ser un santuario', url: 'cancion_s26.html' },
        { title: 'S27. Señor quién entrará', url: 'cancion_s27.html' },
        { title: 'S28. Señor, quiero construir', url: 'cancion_s28.html' },
        { title: 'S29. //Señor, refugio nos has sido de', url: 'cancion_s29.html' },
        { title: 'S30. Señor, Señor Jesús,', url: 'cancion_s30.html' },
        { title: 'S31. Señor, te bendigo por lo que me das', url: 'cancion_s31.html' },
        { title: 'S32. Señor tu eres digno de recibir la gloria,', url: 'cancion_s32.html' },
        { title: 'S33. Señor tú eres mi canción', url: 'cancion_s33.html' },
        { title: 'S34. Señor tú eres mi Pastor,', url: 'cancion_s34.html' },
        { title: 'S35. Señor tu nombre es grande en la tierra.', url: 'cancion_s35.html' },
        { title: 'S36. Señor únenos, Señor únenos', url: 'cancion_s36.html' },
        { title: 'S37. Sepárame para ti', url: 'cancion_s37.html' },
        { title: 'S38. Si el mismo Espíritu que a Cristo levantó', url: 'cancion_s38.html' },
        { title: 'S39. Si en tu vida hay batallas', url: 'cancion_s39.html' },
        { title: 'S40. Si no fuera por el Señor que hiciera yo,', url: 'cancion_s40.html' },
        { title: 'S41. Si te convirtieres yo te restauraré', url: 'cancion_s41.html' },
        { title: 'S42. //Siervos todos alabemos', url: 'cancion_s42.html' },
        { title: 'S43. Sin santidad nadie verá al Señor', url: 'cancion_s43.html' },
        { title: 'S44. Sion es el lugar de gozo', url: 'cancion_s44.html' },
        { title: 'S45. Sirvámosle, sirvámosle', url: 'cancion_s45.html' },
        { title: 'S46. Solamente en Cristo,', url: 'cancion_s46.html' },
        { title: 'S47. Sólo Dios hace al hombre feliz', url: 'cancion_s47.html' },
        { title: 'S48. Sólo el poder de Dios', url: 'cancion_s48.html' },
        { title: 'S49. Sólo tú eres Santo,', url: 'cancion_s49.html' },
        { title: 'S50. Sólo una cosa he pedido al Señor', url: 'cancion_s50.html' },
        { title: 'S51. Soñé que el gran día del juicio llegó', url: 'cancion_s51.html' },
        { title: 'S52. Soy feliz, Cristo me salvó,', url: 'cancion_s52.html' },
        { title: 'S53. Soy una nueva criatura,', url: 'cancion_s53.html' },
        { title: 'S54. Soy yo soldado de Jesús', url: 'cancion_s54.html' },
        { title: 'S55. //Su gloria cubrió los cielos,', url: 'cancion_s55.html' },
        { title: 'S56. // Suba mi oración delante de ti', url: 'cancion_s56.html' },
        { title: 'S57. Sube a la torre Atalaya', url: 'cancion_s57.html' },
        { title: 'S58. Sublime Gracia del Señor', url: 'cancion_s58.html' },
        { title: 'S59. Uh  uh  uh,  la la la la  la  la', url: 'cancion_s59.html' },
        { title: 'S60. D          Bm      A F#-      G              D', url: 'cancion_s60.html' },
        { title: 'S61. Sé exaltado, por siempre', url: 'cancion_s61.html' },
        { title: 'S62. //Si el espíritu de Dios', url: 'cancion_s62.html' },
        { title: 'S63. Soy momentáneo tu eres por siempre', url: 'cancion_s63.html' },
        { title: 'S64. Si en verdad eres salvo di amen ¡amen!', url: 'cancion_s64.html' },
        { title: 'S65. Señor Jesús esa llama', url: 'cancion_s65.html' },
        { title: 'S66. Somos el pueblo que Dios escogió', url: 'cancion_s66.html' },
        { title: 'S67. Señor, ¿a quién iremos?//', url: 'cancion_s67.html' },
        { title: 'S68. Intro:', url: 'cancion_s68.html' },
        { title: 'S69. Señor te doy mi persona', url: 'cancion_s69.html' },
        { title: 'S70. Señor, tu amor es tan vasto y sin fin', url: 'cancion_s70.html' },
        { title: 'S71. Sólo en Jesús esta mi fe,', url: 'cancion_s71.html' },
        { title: 'S72. Su nombre de Guerra es Jehová', url: 'cancion_s72.html' },
        { title: 'S73. //Somos un cuerpo en Cristo,', url: 'cancion_s73.html' },
        { title: 'S74. Sobre montañas y el mar tu río corre para amar', url: 'cancion_s74.html' },
        { title: 'S75. Si vieras el mañana como Dios lo ve,', url: 'cancion_s75.html' },
        { title: 'S76. Sin tener sin esperar', url: 'cancion_s76.html' },
        { title: 'S77. Intro: F   C   Bb   C', url: 'cancion_s77.html' },
        { title: 'S78. Intro', url: 'cancion_s78.html' },
        { title: 'S79. C                       G/B', url: 'cancion_s79.html' },
        { title: 'T1. Tabernáculo entre tu pueblo', url: 'cancion_t1.html' },
        { title: 'T2. Tan cerca de ti,        tan cerca de mí', url: 'cancion_t2.html' },
        { title: 'T3. Tan grande fue el amor de Dios', url: 'cancion_t3.html' },
        { title: 'T4. Te adoro mi gran Señor', url: 'cancion_t4.html' },
        { title: 'T5. Te agradezco Señor,', url: 'cancion_t5.html' },
        { title: 'T6. Te alabare con todo mi corazón', url: 'cancion_t6.html' },
        { title: 'T7. Te alabaré Señor con todo mi corazón,', url: 'cancion_t7.html' },
        { title: 'T8. Te alabo Jesucristo con el entendimiento', url: 'cancion_t8.html' },
        { title: 'T9. Te alabo mi Señor yo te alabo', url: 'cancion_t9.html' },
        { title: 'T10. Intro', url: 'cancion_t10.html' },
        { title: 'T11. Te amo más que la vida Señor,', url: 'cancion_t11.html' },
        { title: 'T12. Te amo mi Señor y pronto te veré', url: 'cancion_t12.html' },
        { title: 'T13. // Te amo Rey, te amo Rey', url: 'cancion_t13.html' },
        { title: 'T14. Te amo Rey y levanto mi voz', url: 'cancion_t14.html' },
        { title: 'T15. Te amo tanto Señor, te necesito Jesús,', url: 'cancion_t15.html' },
        { title: 'T16. Te amo, te amo porque eres mi Señor', url: 'cancion_t16.html' },
        { title: 'T17. Te bendigo Señor, te bendigo Señor,', url: 'cancion_t17.html' },
        { title: 'T18. //Te buscaré, con todo mi ser', url: 'cancion_t18.html' },
        { title: 'T19. Te corono Señor, te corono como mi Rey', url: 'cancion_t19.html' },
        { title: 'T20. Te damos gracias Señor,', url: 'cancion_t20.html' },
        { title: 'T21. Te daré lo mejor del trigo', url: 'cancion_t21.html' },
        { title: 'T22. Te exaltamos, te exaltamos,', url: 'cancion_t22.html' },
        { title: 'T23. Te exaltaré mi Dios, mi Rey', url: 'cancion_t23.html' },
        { title: 'T24. Te glorifico Dios', url: 'cancion_t24.html' },
        { title: 'T25. Te ofrecemos a ti', url: 'cancion_t25.html' },
        { title: 'T26. Te vengo a decir, te vengo a decir,', url: 'cancion_t26.html' },
        { title: 'T27. Te veo en tu trono de justicia', url: 'cancion_t27.html' },
        { title: 'T28. Temo fallarte y no llegar', url: 'cancion_t28.html' },
        { title: 'T29. Ten misericordia de mí oh Dios', url: 'cancion_t29.html' },
        { title: 'T30. Tenemos un Dios muy, muy grande', url: 'cancion_t30.html' },
        { title: 'T31. Tengo en mi alma un avivamiento,', url: 'cancion_t31.html' },
        { title: 'T32. //Tierno es el amor de mi Señor', url: 'cancion_t32.html' },
        { title: 'T33. Toda la tierra te alabará', url: 'cancion_t33.html' },
        { title: 'T34. Todo a Cristo yo me rindo', url: 'cancion_t34.html' },
        { title: 'T35. Todo lo he tenido por basura', url: 'cancion_t35.html' },
        { title: 'T36. Todos deben de saber,', url: 'cancion_t36.html' },
        { title: 'T37. Toma este pan, yo te lo doy.', url: 'cancion_t37.html' },
        { title: 'T38. Todos nosotros nos descarriamos', url: 'cancion_t38.html' },
        { title: 'T39. Toma hoy mi corazón oh Dios', url: 'cancion_t39.html' },
        { title: 'T40. Toma mi ser, es para ti,', url: 'cancion_t40.html' },
        { title: 'T41. Tomado de la mano yo voy,', url: 'cancion_t41.html' },
        { title: 'T42. Torre fuerte es el nombre del Señor', url: 'cancion_t42.html' },
        { title: 'T43. Traemos sacrificio de alaban - za,', url: 'cancion_t43.html' },
        { title: 'T44. Tres valientes dieron de beber al Rey', url: 'cancion_t44.html' },
        { title: 'T45. //Tú amas la alabanza', url: 'cancion_t45.html' },
        { title: 'T46. Tú amas la verdad', url: 'cancion_t46.html' },
        { title: 'T47. Tu amigo seré, tu amigo seré,', url: 'cancion_t47.html' },
        { title: 'T48. Tu amor por mí es más dulce que la miel', url: 'cancion_t48.html' },
        { title: 'T49. // Tú como Zaqueo necesitas ver a Dios', url: 'cancion_t49.html' },
        { title: 'T50. Tú eres digno de obediencia', url: 'cancion_t50.html' },
        { title: 'T51. Tú eres digno, tú eres digno,', url: 'cancion_t51.html' },
        { title: 'T52. Tú eres Dios tú eres Rey', url: 'cancion_t52.html' },
        { title: 'T53. Tú eres Dios, tú eres mi Rey', url: 'cancion_t53.html' },
        { title: 'T54. Tú eres la vid Señor y yo el pámpano', url: 'cancion_t54.html' },
        { title: 'T55. Tu fidelidad es grande,', url: 'cancion_t55.html' },
        { title: 'T56. Tu misericordia', url: 'cancion_t56.html' },
        { title: 'T57. Tu nombre levantaré', url: 'cancion_t57.html' },
        { title: 'T58. Tu nombre oh Dios es puro y santo', url: 'cancion_t58.html' },
        { title: 'T59. Tu presencia, tu presencia me da paz.', url: 'cancion_t59.html' },
        { title: 'T60. Tu sangre me limpia de toda maldad', url: 'cancion_t60.html' },
        { title: 'T61. Tu voz, tu voz, tu voz,', url: 'cancion_t61.html' },
        { title: 'T62. Tan grande amor es del señor', url: 'cancion_t62.html' },
        { title: 'T63. // Te adorare te adorare', url: 'cancion_t63.html' },
        { title: 'T64. Te adoraré a ti Señor', url: 'cancion_t64.html' },
        { title: 'T65. // Te alabare de todo mi corazón', url: 'cancion_t65.html' },
        { title: 'T66. Tu sacaste mi vida de la sepultura', url: 'cancion_t66.html' },
        { title: 'T67. Tu escuchaste la voz de mi suplica', url: 'cancion_t67.html' },
        { title: 'T68. Todo el mundo es', url: 'cancion_t68.html' },
        { title: 'T69. Te alabarán oh Jehová todos los reyes', url: 'cancion_t69.html' },
        { title: 'T70. Te adoraré', url: 'cancion_t70.html' },
        { title: 'T71. Tanto tiempo anduve navegando en soledad', url: 'cancion_t71.html' },
        { title: 'T72. Te damos gracias Señor', url: 'cancion_t72.html' },
        { title: 'T73. Te glorificaré, oh Jehová', url: 'cancion_t73.html' },
        { title: 'T74. Tres días de viaje al sagrado lugar', url: 'cancion_t74.html' },
        { title: 'T75. Te alabaré con el corazón,', url: 'cancion_t75.html' },
        { title: 'T76. Te loamos, ¡oh Dios!', url: 'cancion_t76.html' },
        { title: 'T77. Tú que dices ser hijo de Dios dime donde están tus frutos', url: 'cancion_t77.html' },
        { title: 'T78. //Tú encenderás mi lámpara', url: 'cancion_t78.html' },
        { title: 'T79. Tu sólo eres Jehová', url: 'cancion_t79.html' },
        { title: 'T80. Tú me has llamado a creer', url: 'cancion_t80.html' },
        { title: 'T81. Tenme de tu mano', url: 'cancion_t81.html' },
        { title: 'T82. Ten piedad de mí oh Dios', url: 'cancion_t82.html' },
        { title: 'T83. Tú eres principio y final,', url: 'cancion_t83.html' },
        { title: 'T84. Toda la tierra te alabe Señor', url: 'cancion_t84.html' },
        { title: 'T85. Te adoramos señor', url: 'cancion_t85.html' },
        { title: 'T86. Tan grande fue tu amor, tomaste mi lugar', url: 'cancion_t86.html' },
        { title: 'T87. Capo en el 1er traste', url: 'cancion_t87.html' },
        { title: 'U1. Un cántico nuevo al Señor', url: 'cancion_u1.html' },
        { title: 'U2. //Una mirada de fe,', url: 'cancion_u2.html' },
        { title: 'U3. E                                 Ddis      F#m', url: 'cancion_u3.html' },
        { title: 'U4. Una vez perdido vivía   yo', url: 'cancion_u4.html' },
        { title: 'U5. Unidos, unidos en su nombre unidos.', url: 'cancion_u5.html' },
        { title: 'U6. Un viento, y en el viento no estaba,', url: 'cancion_u6.html' },
        { title: 'U7. Una cosa he demandado a Dios', url: 'cancion_u7.html' },
        { title: 'U8. Un día nuevo amaneció,', url: 'cancion_u8.html' },
        { title: 'V1. Vamos orando', url: 'cancion_v1.html' },
        { title: 'V2. Vamos todos a alabar', url: 'cancion_v2.html' },
        { title: 'V3. Ven a adorar', url: 'cancion_v3.html' },
        { title: 'V4. Ven, Espíritu de Dios cae de nuevo en mí.', url: 'cancion_v4.html' },
        { title: 'V5. Ven por tu alabanza Señor,', url: 'cancion_v5.html' },
        { title: 'V6. E     B/D#     C#m', url: 'cancion_v6.html' },
        { title: 'V7. //Ven a caminar sobre las aguas,', url: 'cancion_v7.html' },
        { title: 'V8. Ven Señor no tardes, mi alma te anhela', url: 'cancion_v8.html' },
        { title: 'V9. Ven sopla sobre mí, Espíritu de Dios', url: 'cancion_v9.html' },
        { title: 'V10. Ven y toma el trono de mi corazón', url: 'cancion_v10.html' },
        { title: 'V11. Ven y ven conmigo', url: 'cancion_v11.html' },
        { title: 'V12. Vengan a mí todos los que están cansados,', url: 'cancion_v12.html' },
        { title: 'V13. Vengo a glorificarte, a en ti envolverme,', url: 'cancion_v13.html' },
        { title: 'V14. D               A/C#', url: 'cancion_v14.html' },
        { title: 'V15. Vengo a ti oh Señor toma hoy mi corazón', url: 'cancion_v15.html' },
        { title: 'V16. Intro:', url: 'cancion_v16.html' },
        { title: 'V17. Venid adoremos a Jesús y postrémonos delante de nuestro hacedor.', url: 'cancion_v17.html' },
        { title: 'V18. Venid adoremos al Señor', url: 'cancion_v18.html' },
        { title: 'V19. Venid adoremos con gozo al Señor', url: 'cancion_v19.html' },
        { title: 'V20. Venid al Lugar Santísimo', url: 'cancion_v20.html' },
        { title: 'V21. Venid subamos al monte de Jehová', url: 'cancion_v21.html' },
        { title: 'V22. Venimos ante ti Señor', url: 'cancion_v22.html' },
        { title: 'V23. Veo a Cristo', url: 'cancion_v23.html' },
        { title: 'V24. Viene una grande gloria', url: 'cancion_v24.html' },
        { title: 'V25. Vine a alabar a Dios,', url: 'cancion_v25.html' },
        { title: 'V26. Viste mi vida perdida, mi alma vacía.', url: 'cancion_v26.html' },
        { title: 'V27. Volvió del desierto', url: 'cancion_v27.html' },
        { title: 'V28. Voy a proseguir, proseguir', url: 'cancion_v28.html' },
        { title: 'V29. G                                           D/F#', url: 'cancion_v29.html' },
        { title: 'V30. Venimos ante Ti', url: 'cancion_v30.html' },
        { title: 'V31. // Voz de júbilo y de salvación', url: 'cancion_v31.html' },
        { title: 'V32. Venciendo las ciudades con el poder de', url: 'cancion_v32.html' },
        { title: 'V33. G           D/F#        Em', url: 'cancion_v33.html' },
        { title: 'V34. Venimos ante ti Señor, llenos de', url: 'cancion_v34.html' },
        { title: 'V35. Ven amigo a Jesús,', url: 'cancion_v35.html' },
        { title: 'V36. E                               A/E  E', url: 'cancion_v36.html' },
        { title: 'V36. Ven Santo Espíritu,', url: 'cancion_v36.html' },
        { title: 'V37. //Vengan subamos al monte', url: 'cancion_v37.html' },
        { title: 'V38. Vino el hijo del hombre a buscar,', url: 'cancion_v38.html' },
        { title: 'Y1. D                   A/C#               Bm', url: 'cancion_y1.html' },
        { title: 'Y2. Y por el Espíritu que nos ha dado', url: 'cancion_y2.html' },
        { title: 'Y3. Y si vivimos para él vivimos,', url: 'cancion_y3.html' },
        { title: 'Y4. Ya me entregué a mi Padre celestial', url: 'cancion_y4.html' },
        { title: 'Y5. Yo celebraré, cantaré al Señor', url: 'cancion_y5.html' },
        { title: 'Y6. //Yo exalto, exalto al precioso Cordero', url: 'cancion_y6.html' },
        { title: 'Y7. Yo he hablado todas estas cosas', url: 'cancion_y7.html' },
        { title: 'Y8. Yo he venido a alabar', url: 'cancion_y8.html' },
        { title: 'Y9. Yo he venido a alabar a', url: 'cancion_y9.html' },
        { title: 'Y10. Yo me alegraré, en Dios me alegraré.', url: 'cancion_y10.html' },
        { title: 'Y11. Yo no soy nada y del polvo nací', url: 'cancion_y11.html' },
        { title: 'Y12. Yo nunca lo vi mas ahora lo sentí', url: 'cancion_y12.html' },
        { title: 'Y13. // Yo quiero andar las calles de oro', url: 'cancion_y13.html' },
        { title: 'Y14. Yo quiero estar cerca de ti Señor', url: 'cancion_y14.html' },
        { title: 'Y15. Yo quiero más y más de Cristo,', url: 'cancion_y15.html' },
        { title: 'Y16. Yo quiero ser Señor amado', url: 'cancion_y16.html' },
        { title: 'Y17. Yo siento como que la Gloria bajo', url: 'cancion_y17.html' },
        { title: 'Y18. Yo sólo quiero estar donde tú estas', url: 'cancion_y18.html' },
        { title: 'Y19. Yo te alabaré, cantaré de ti', url: 'cancion_y19.html' },
        { title: 'Y20. Yo te alabo de corazón', url: 'cancion_y20.html' },
        { title: 'Y21. Yo te amo en el amor del Señor,', url: 'cancion_y21.html' },
        { title: 'Y22. Yo te llevaré, yo te llevaré', url: 'cancion_y22.html' },
        { title: 'Y23. Yo tengo paz y gozo en mi corazón,', url: 'cancion_y23.html' },
        { title: 'Y24. Yo tengo un amigo que me ama', url: 'cancion_y24.html' },
        { title: 'Y25. Yo tengo un Dios poderoso', url: 'cancion_y25.html' },
        { title: 'Y26. Yo vi al Señor en su trono alto y sublime', url: 'cancion_y26.html' },
        { title: 'Y27. Yo vivo, yo vivo porque ha resucitado.', url: 'cancion_y27.html' },
        { title: 'Y28. // Yo quiero llorar //', url: 'cancion_y28.html' },
        { title: 'Y29. Yo tengo gozo en mi alma', url: 'cancion_y29.html' },
        { title: 'Y30. Yo te doy gracias', url: 'cancion_y30.html' },
        { title: 'Y31. Yo entro al lugar mas santo', url: 'cancion_y31.html' },
        { title: 'Y32. Yo amo a Cristo, él me ama a mi', url: 'cancion_y32.html' },
        { title: 'Y33. Yo no quiero ser un tizón apagado', url: 'cancion_y33.html' },
        { title: 'Y34. Yo encontré a Jesucristo', url: 'cancion_y34.html' },
        { title: 'Y35. Yo te exalto, oh Dios, en tu templo', url: 'cancion_y35.html' },
        { title: 'Y36. Yo te conocí desde el vientre de tu madre', url: 'cancion_y36.html' },
        { title: 'Y37. // Yo me alegre', url: 'cancion_y37.html' }
];

let favorites = JSON.parse(localStorage.getItem('mySetlist')) || [];
let currentMode = 'all';

function getKeyByName(n) {
    if (!n) return null;
    if (n.charAt(n.length-1) == "m") n = n.substring(0, n.length-1);
    return keysDict.find(k => k.name === n) || null;
}

function getChordRoot(i) {
    if (i.length > 1 && (i.charAt(1) == "b" || i.charAt(1) == "#")) return i.substr(0, 2);
    return i.substr(0, 1);
}

function getNewKey(oldKey, delta, targetKey) {
    let orig = getKeyByName(oldKey);
    if (!orig) return null;
    let val = orig.value + delta;
    if (val > 11) val -= 12; else if (val < 0) val += 12;
    
    let i=0;
    if ([0,2,5,7,10].includes(val)) {
        if (targetKey && targetKey.type == "F") {
            let k = keysDict.find(k => k.value === val && k.type === "F");
            if (k) return k;
        }
        let k = keysDict.find(k => k.value === val && k.type === "S");
        if (k) return k;
    }
    let k = keysDict.find(k => k.value === val && k.type === "N");
    if (k) return k;
    return keysDict.find(k => k.value === val) || null;
}

window.getTransposedLines = function(hiddenPre, origKeyName, targetKeyName) {
    let lines = hiddenPre.textContent.split(/\r\n|\n/g);
    let output = [];
    
    let origK = getKeyByName(origKeyName);
    let targetK = targetKeyName ? getKeyByName(targetKeyName) : origK;
    let delta = (targetK && origK) ? targetK.value - origK.value : 0;
    if (delta < 0) delta += 12;

    for (let line of lines) {
        let isChord = true;
        let tokens = line.replace(/\s+/g, " ").trim().split(" ");
        if (tokens.length === 0 || line.trim() === "") isChord = false;
        else {
            for (let j = 0; j < tokens.length; j++) {
                let match = tokens[j].match(chordRegexLine);
                if (tokens[j] !== "" && !match) { isChord = false; break; }
            }
        }
        
        if (isChord && delta !== 0) {
            line = line.replace(chordReplaceRegex, function(match) {
                let root = getChordRoot(match);
                let newR = getNewKey(root, delta, targetK);
                return newR ? newR.name + match.substr(root.length) : match;
            });
        }
        output.push({ text: line, isChord: isChord });
    }
    return output;
}

$(document).ready(function() {
    // ----------------------------------------------------
    // LÓGICA DE MENÚ MÓVIL (Global)
    // ----------------------------------------------------
    const btn = $('#mobile-menu');
    const menu = $('#nav-list');
    if (btn.length && menu.length) {
        btn.on('click', function(e) {
            e.preventDefault();
            const icon = $(this).find('i');
            if (menu.is(':visible')) {
                menu.hide();
                icon.removeClass('fa-times').addClass('fa-bars');
            } else {
                menu.css('display', 'flex');
                icon.removeClass('fa-bars').addClass('fa-times');
            }
        });
    }

    // ----------------------------------------------------
    // LÓGICA DE ÍNDICE (index.html)
    // ----------------------------------------------------
    if ($('#songList').length > 0) {
        updateCounts();

        $('#tab-all').click(() => {
            currentMode = 'all';
            $('#tab-all').css({'background': '#2563eb', 'color': 'white'});
            $('#tab-setlist').css({'background': '#e2e8f0', 'color': '#475569'});
            $('#setlist-actions').hide();
            window.filterSongs();
        });

        $('#tab-setlist').click(() => {
            currentMode = 'setlist';
            $('#tab-setlist').css({'background': '#2563eb', 'color': 'white'});
            $('#tab-all').css({'background': '#e2e8f0', 'color': '#475569'});
            $('#setlist-actions').css('display', 'flex');
            window.filterSongs();
        });

        $('#searchInput').on('input', window.filterSongs);
        window.filterSongs();
    }
    
    // ----------------------------------------------------
    // LÓGICA DE CANCIÓN INDIVIDUAL
    // ----------------------------------------------------
    let songContentEl = document.getElementById('song-content');
    if (songContentEl) {
        let originalKeyName = songContentEl.getAttribute('data-key');
        let trackedKey = keysDict.find(k => k.name === originalKeyName) || keysDict.find(k => k.name === 'C');
        let currentFilename = window.location.pathname.split('/').pop() || "";

        // Rastrear los clics de los botones de transposición para guardar la llave
        $('#transpose-up').click(() => {
            let idx = displayKeys.findIndex(k => k.value === trackedKey.value);
            trackedKey = displayKeys[(idx + 1) % 12];
        });

        $('#transpose-down').click(() => {
            let idx = displayKeys.findIndex(k => k.value === trackedKey.value);
            trackedKey = displayKeys[(idx - 1 + 12) % 12];
        });

        $('#btn-add-setlist').click(() => {
            let existingIndex = favorites.findIndex(f => f.id === currentFilename);
            let entry = {id: currentFilename, key: trackedKey.name};
            
            if (existingIndex > -1) favorites[existingIndex] = entry;
            else favorites.push(entry);
            
            localStorage.setItem('mySetlist', JSON.stringify(favorites));
            
            let btn = document.getElementById('btn-add-setlist');
            btn.style.backgroundColor = '#f59e0b';
            setTimeout(() => { btn.style.backgroundColor = '#10b981'; }, 1000);
            alert("Añadido al Setlist con éxito.");
        });

        // Modal del Buscador
        $('body').append(`
            <div id="searchModal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(255,255,255,0.98); z-index:2000; overflow-y:auto; padding:20px; box-sizing:border-box;">
                <div style="max-width: 600px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
                        <h2 style="margin:0; color:#2563eb;">Buscar Canción</h2>
                        <button id="closeSearchBtn" style="background:none; border:none; font-size:28px; color:#333; cursor:pointer;">&times;</button>
                    </div>
                    <input type="text" id="songSearchInputModal" style="width:100%; padding:12px; border:2px solid #e2e8f0; border-radius:6px; font-size:16px; margin-bottom:15px; box-sizing:border-box; outline:none;" placeholder="Escribe el nombre o número...">
                    <div id="songSearchResults" style="display:flex; flex-direction:column; gap:10px;"></div>
                </div>
            </div>
        `);

        $('#openSearchBtn').click(() => {
            $('#searchModal').fadeIn(200);
            $('#songSearchInputModal').val('').focus();
            renderSearchResults("");
        });

        $('#closeSearchBtn').click(() => $('#searchModal').fadeOut(200));

        $('#songSearchInputModal').on('input', function() {
            renderSearchResults($(this).val());
        });

        function renderSearchResults(filterText) {
            const cleanText = (text) => text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[.,]/g, "").trim();
            const filter = cleanText(filterText);
            const resultsContainer = $('#songSearchResults');
            resultsContainer.empty();

            let matches = songDatabase.filter(s => cleanText(s.title).includes(filter));
            if (matches.length === 0) {
                resultsContainer.append('<div style="text-align:center; color:#999; padding:20px;">No se encontraron canciones.</div>');
                return;
            }

            matches.slice(0, 50).forEach(s => {
                resultsContainer.append(`
                    <a href="${s.url}" style="text-decoration:none; color:#333; padding:12px; border-bottom:1px solid #eee; display:block; border-radius:4px; transition:0.2s;">
                        ${s.title}
                    </a>
                `);
            });
        }
    }
});

// FUNCIONES GLOBALES PARA ÍNDICE
window.removeSong = function(id, event) {
    event.preventDefault();
    event.stopPropagation();
    favorites = favorites.filter(f => f.id !== id);
    localStorage.setItem('mySetlist', JSON.stringify(favorites));
    updateCounts();
    window.filterSongs();
}

window.clearSetlist = function() {
    if(confirm("¿Estás seguro de que deseas eliminar todas las canciones del Setlist actual?")) {
        favorites = [];
        localStorage.setItem('mySetlist', '[]');
        updateCounts();
        window.filterSongs();
    }
}

window.moveSong = function(btn, direction, event) {
    event.preventDefault();
    event.stopPropagation();
    let item = btn.closest('.song-item');
    let id = item.getAttribute('data-id');
    let favIndex = favorites.findIndex(f => f.id === id);
    
    if (favIndex === -1) return;
    if (direction === -1 && favIndex > 0) {
        let temp = favorites[favIndex - 1];
        favorites[favIndex - 1] = favorites[favIndex];
        favorites[favIndex] = temp;
    } else if (direction === 1 && favIndex < favorites.length - 1) {
        let temp = favorites[favIndex + 1];
        favorites[favIndex + 1] = favorites[favIndex];
        favorites[favIndex] = temp;
    } else return;
    
    localStorage.setItem('mySetlist', JSON.stringify(favorites));
    window.filterSongs();
}

window.filterSongs = function() {
    const input = document.getElementById('searchInput');
    if (!input) return;
    const cleanText = (text) => text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[.,]/g, "").trim();
    const filter = cleanText(input.value);
    const songList = document.getElementById('songList');
    const items = Array.from(songList.getElementsByClassName('song-item'));
    let hasResults = false;

    if (currentMode === 'setlist') {
        items.sort((a, b) => {
            let idA = a.getAttribute('data-id');
            let idB = b.getAttribute('data-id');
            let idxA = favorites.findIndex(f => f.id === idA);
            let idxB = favorites.findIndex(f => f.id === idB);
            if (idxA === -1) idxA = 99999;
            if (idxB === -1) idxB = 99999;
            return idxA - idxB;
        });
    } else {
        items.sort((a, b) => parseInt(a.getAttribute('data-index')) - parseInt(b.getAttribute('data-index')));
    }
    
    items.forEach(item => songList.appendChild(item));

    for (let i = 0; i < items.length; i++) {
        let songText = cleanText(items[i].textContent || items[i].innerText);
        let sortBtns = items[i].querySelector('.sort-btns');
        let rmBtn = items[i].querySelector('.remove-btn');
        let itemId = items[i].getAttribute('data-id');
        
        let isFav = favorites.findIndex(f => f.id === itemId) > -1;
        let matchesSearch = songText.indexOf(filter) > -1;
        let matchesTab = currentMode === 'all' || (currentMode === 'setlist' && isFav);

        if (matchesSearch && matchesTab) {
            items[i].style.display = "flex";
            hasResults = true;
        } else {
            items[i].style.display = "none";
        }

        if (sortBtns) sortBtns.style.display = (currentMode === 'setlist') ? 'flex' : 'none';
        if (rmBtn) rmBtn.style.display = (currentMode === 'setlist') ? 'block' : 'none';
    }
    let noRes = document.getElementById('no-results');
    if (noRes) noRes.style.display = hasResults ? "none" : "block";
}

function updateCounts() {
    let el = document.getElementById('setlist-count');
    if(el) el.innerText = favorites.length;
}

window.copySetlistToWord = function() {
    const justTitles = confirm("¿Deseas copiar SÓLO LOS TÍTULOS de las canciones?\n\n- Haz clic en 'Aceptar' para solo los títulos.\n- Haz clic en 'Cancelar' para copiar el repertorio COMPLETO (Ideal para pegar en Word, respetando espacios).");
    
    let container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    
    let header = document.createElement('h2');
    header.innerText = 'MI SETLIST';
    header.style.color = '#2563eb';
    header.style.fontFamily = 'Arial, sans-serif';
    container.appendChild(header);
    
    const items = document.getElementsByClassName('song-item');
    let hasSongs = false;
    
    for (let i = 0; i < items.length; i++) {
        let filename = items[i].getAttribute('data-id');
        let fav = favorites.find(f => f.id === filename);
        
        if (fav && items[i].style.display !== "none") {
            hasSongs = true;
            let titleText = items[i].querySelector('a').innerText;
            
            let titleEl = document.createElement('h3');
            titleEl.innerText = titleText;
            titleEl.style.color = '#333';
            titleEl.style.fontFamily = 'Arial, sans-serif';
            titleEl.style.marginTop = '20px';
            titleEl.style.marginBottom = '10px';
            container.appendChild(titleEl);
            
            if (!justTitles) {
                let hiddenPre = document.getElementById('raw-' + filename);
                if (hiddenPre) {
                    let origKeyName = items[i].getAttribute('data-orig-key');
                    let targetKeyName = fav.key ? fav.key : origKeyName;
                    
                    let blockEl = document.createElement('div');
                    blockEl.style.fontFamily = "Arial, sans-serif";
                    blockEl.style.fontSize = "10pt";
                    blockEl.style.marginBottom = "20px";
                    
                    let linesData = getTransposedLines(hiddenPre, origKeyName, targetKeyName);
                    let outputHTML = "";
                    
                    for (let lineData of linesData) {
                        let htmlText = lineData.text;
                        if (lineData.isChord) {
                            htmlText = htmlText.replace(chordReplaceRegex, "<span style='color: #2563eb; font-weight: bold;'>$1</span>");
                        }
                        
                        // Reemplazar espacios por &nbsp; solo fuera de los tags HTML para no afectar estilos
                        let parts = htmlText.split(/(<[^>]+>)/);
                        for(let p=0; p<parts.length; p++) {
                            if(!parts[p].startsWith('<')) {
                                parts[p] = parts[p].replace(/ /g, '&nbsp;');
                            }
                        }
                        htmlText = parts.join('');
                        
                        // Uso estricto de interlineado 0
                        outputHTML += `<div style="margin:0; padding:0; line-height:1; mso-line-height-rule:exactly;">${htmlText || "&nbsp;"}</div>`;
                    }
                    blockEl.innerHTML = outputHTML;
                    container.appendChild(blockEl);
                }
            }
        }
    }
    
    if (!hasSongs) { alert("Tu setlist está vacío."); return; }
    
    document.body.appendChild(container);
    let range = document.createRange();
    range.selectNodeContents(container);
    let sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    
    try {
        document.execCommand('copy');
        alert("¡Setlist copiado al portapapeles!\n\nAbre Microsoft Word y presiona Pegar. Se conservarán acordes y espacios.");
    } catch (err) { alert("Tu navegador no soporta el copiado automático."); }
    
    sel.removeAllRanges();
    document.body.removeChild(container);
}

function buildPrintZone() {
    const printZone = document.getElementById('print-zone');
    if(!printZone) return false;
    printZone.innerHTML = ''; 
    let hasSongs = false;
    let totalLines = 0;
    
    const items = document.getElementsByClassName('song-item');
    for (let i = 0; i < items.length; i++) {
        let filename = items[i].getAttribute('data-id');
        let fav = favorites.find(f => f.id === filename);
        
        if (fav && items[i].style.display !== "none") {
            hasSongs = true;
            let hiddenPre = document.getElementById('raw-' + filename);
            if (hiddenPre) {
                let origKeyName = items[i].getAttribute('data-orig-key');
                let targetKeyName = fav.key ? fav.key : origKeyName;

                let div = document.createElement('div');
                div.className = 'print-song';
                
                let titleText = items[i].querySelector('a').innerText;
                let titleDiv = document.createElement('div');
                titleDiv.innerHTML = "<strong>" + titleText + "</strong><br><br>";
                div.appendChild(titleDiv);

                let linesData = getTransposedLines(hiddenPre, origKeyName, targetKeyName);
                totalLines += linesData.length + 3; // Estimar cantidad de líneas
                let htmlLines = linesData.map(ld => {
                    let t = ld.text;
                    if (ld.isChord) t = t.replace(chordReplaceRegex, "<span class='c'>$1</span>");
                    return t;
                });
                
                let bodyDiv = document.createElement('div');
                bodyDiv.innerHTML = htmlLines.join("<br>");
                div.appendChild(bodyDiv);
                
                printZone.appendChild(div);
            }
        }
    }
    
    // Asignación de columnas dinámicas según la longitud de líneas
    if (totalLines < 60) {
        printZone.style.columnCount = "1";
    } else if (totalLines < 120) {
        printZone.style.columnCount = "2";
    } else {
        printZone.style.columnCount = "3";
    }
    
    return hasSongs;
}

window.printSetlist = function() {
    if (!buildPrintZone()) {
        alert("Tu setlist está vacío.");
        return;
    }
    window.print();
}

window.sendToWhatsApp = function() {
    if (favorites.length === 0) { alert("Tu setlist está vacío."); return; }
    alert("⚠️ WhatsApp no permite enviar archivos PDF directamente desde enlaces web.\n\nA continuación se abrirá la vista de impresión. Por favor:\n\n1. Cambia el Destino a 'Guardar como PDF'.\n2. Guárdalo y envíalo manualmente por WhatsApp.");
    window.printSetlist();
}
