// Lyric Alchemist - Transform lyrics into chemistry + math coded language

export interface PeriodicElement {
  symbol: string;
  name: string;
  letters: string[];
  color?: string; // <-- add color property
}

// Periodic Table mapping with colors
export const PERIODIC_ELEMENTS: PeriodicElement[] = [
  { symbol: 'H', name: 'Hydrogen', letters: ['h'], color: "#FFFFFF" },
  { symbol: 'He', name: 'Helium', letters: ['he'], color: "#D9FFFF" },
  { symbol: 'Li', name: 'Lithium', letters: ['li'], color: "#CC80FF" },
  { symbol: 'Be', name: 'Beryllium', letters: ['be'], color: "#C2FF00" },
  { symbol: 'B', name: 'Boron', letters: ['b'], color: "#FFB5B5" },
  { symbol: 'C', name: 'Carbon', letters: ['c'], color: "#909090" },
  { symbol: 'N', name: 'Nitrogen', letters: ['n'], color: "#3050F8" },
  { symbol: 'O', name: 'Oxygen', letters: ['o'], color: "#FF0D0D" },
  { symbol: 'F', name: 'Fluorine', letters: ['f'], color: "#90E050" },
  { symbol: 'Ne', name: 'Neon', letters: ['ne'], color: "#B3E3F5" },
  { symbol: 'Na', name: 'Sodium', letters: ['na'], color: "#AB5CF2" },
  { symbol: 'Mg', name: 'Magnesium', letters: ['mg'], color: "#8AFF00" },
  { symbol: 'Al', name: 'Aluminum', letters: ['al'], color: "#BFA6A6" },
  { symbol: 'Si', name: 'Silicon', letters: ['si'], color: "#F0C8A0" },
  { symbol: 'P', name: 'Phosphorus', letters: ['p'], color: "#FF8000" },
  { symbol: 'S', name: 'Sulfur', letters: ['s'], color: "#FFFF30" },
  { symbol: 'Cl', name: 'Chlorine', letters: ['cl'], color: "#1FF01F" },
  { symbol: 'Ar', name: 'Argon', letters: ['ar'], color: "#80D1E3" },
  { symbol: 'K', name: 'Potassium', letters: ['k'], color: "#8F40D4" },
  { symbol: 'Ca', name: 'Calcium', letters: ['ca'], color: "#3DFF00" },
  { symbol: 'Ti', name: 'Titanium', letters: ['ti'], color: "#BFC2C7" },
  { symbol: 'V', name: 'Vanadium', letters: ['v'], color: "#A6A6AB" },
  { symbol: 'Cr', name: 'Chromium', letters: ['cr'], color: "#8A99C7" },
  { symbol: 'Mn', name: 'Manganese', letters: ['mn'], color: "#9C7AC7" },
  { symbol: 'Fe', name: 'Iron', letters: ['fe'], color: "#E06633" },
  { symbol: 'Co', name: 'Cobalt', letters: ['co'], color: "#F090A0" },
  { symbol: 'Ni', name: 'Nickel', letters: ['ni'], color: "#50D050" },
  { symbol: 'Cu', name: 'Copper', letters: ['cu'], color: "#C88033" },
  { symbol: 'Zn', name: 'Zinc', letters: ['zn'], color: "#7D80B0" },
  { symbol: 'Ga', name: 'Gallium', letters: ['ga'], color: "#C28F8F" },
  { symbol: 'Ge', name: 'Germanium', letters: ['ge'], color: "#668F8F" },
  { symbol: 'As', name: 'Arsenic', letters: ['as'], color: "#BD80E3" },
  { symbol: 'Se', name: 'Selenium', letters: ['se'], color: "#FFA100" },
  { symbol: 'Br', name: 'Bromine', letters: ['br'], color: "#A62929" },
  { symbol: 'Kr', name: 'Krypton', letters: ['kr'], color: "#5CB8D1" },
  { symbol: 'Rb', name: 'Rubidium', letters: ['rb'], color: "#702EB0" },
  { symbol: 'Sr', name: 'Strontium', letters: ['sr'], color: "#00FF00" },
  { symbol: 'Y', name: 'Yttrium', letters: ['y'], color: "#94FFFF" },
  { symbol: 'Zr', name: 'Zirconium', letters: ['zr'], color: "#94E0E0" },
  { symbol: 'Nb', name: 'Niobium', letters: ['nb'], color: "#73C2C9" },
  { symbol: 'Mo', name: 'Molybdenum', letters: ['mo'], color: "#54B5B5" },
  { symbol: 'Tc', name: 'Technetium', letters: ['tc'], color: "#B3B3B3" },
  { symbol: 'Ru', name: 'Ruthenium', letters: ['ru'], color: "#A6D1D1" },
  { symbol: 'Rh', name: 'Rhodium', letters: ['rh'], color: "#E1E1E1" },
  { symbol: 'Pd', name: 'Palladium', letters: ['pd'], color: "#B0B0B0" },
  { symbol: 'Ag', name: 'Silver', letters: ['ag'], color: "#C0C0C0" },
  { symbol: 'Cd', name: 'Cadmium', letters: ['cd'], color: "#FFD98F" },
  { symbol: 'In', name: 'Indium', letters: ['in'], color: "#A67573" },
  { symbol: 'Sn', name: 'Tin', letters: ['sn'], color: "#668080" },
  { symbol: 'Sb', name: 'Antimony', letters: ['sb'], color: "#9E63B5" },
  { symbol: 'Te', name: 'Tellurium', letters: ['te'], color: "#D47A00" },
  { symbol: 'I', name: 'Iodine', letters: ['i'], color: "#940094" },
  { symbol: 'Xe', name: 'Xenon', letters: ['xe'], color: "#429EB0" },
  { symbol: 'Ba', name: 'Barium', letters: ['ba'], color: "#00C900" },
  { symbol: 'La', name: 'Lanthanum', letters: ['la'], color: "#70D4FF" },
  { symbol: 'Ce', name: 'Cerium', letters: ['ce'], color: "#FFFFC7" },
  { symbol: 'Pr', name: 'Praseodymium', letters: ['pr'], color: "#D9FFC7" },
  { symbol: 'Nd', name: 'Neodymium', letters: ['nd'], color: "#C7FFC7" },
  { symbol: 'Pm', name: 'Promethium', letters: ['pm'], color: "#A3FFC7" },
  { symbol: 'Sm', name: 'Samarium', letters: ['sm'], color: "#8FFFC7" },
  { symbol: 'Eu', name: 'Europium', letters: ['eu'], color: "#61FFC7" },
  { symbol: 'Gd', name: 'Gadolinium', letters: ['gd'], color: "#45FFC7" },
  { symbol: 'Tb', name: 'Terbium', letters: ['tb'], color: "#30FFC7" },
  { symbol: 'Dy', name: 'Dysprosium', letters: ['dy'], color: "#1FFFC7" },
  { symbol: 'Ho', name: 'Holmium', letters: ['ho'], color: "#00FF9C" },
  { symbol: 'Er', name: 'Erbium', letters: ['er'], color: "#00E675" },
  { symbol: 'Tm', name: 'Thulium', letters: ['tm'], color: "#00D452" },
  { symbol: 'Yb', name: 'Ytterbium', letters: ['yb'], color: "#00BF38" },
  { symbol: 'Lu', name: 'Lutetium', letters: ['lu'], color: "#00AB24" },
  { symbol: 'Hf', name: 'Hafnium', letters: ['hf'], color: "#4DC2FF" },
  { symbol: 'Ta', name: 'Tantalum', letters: ['ta'], color: "#4DA6FF" },
  { symbol: 'W', name: 'Tungsten', letters: ['w'], color: "#2194D6" },
  { symbol: 'Re', name: 'Rhenium', letters: ['re'], color: "#267DAB" },
  { symbol: 'Os', name: 'Osmium', letters: ['os'], color: "#266696" },
  { symbol: 'Ir', name: 'Iridium', letters: ['ir'], color: "#175487" },
  { symbol: 'Pt', name: 'Platinum', letters: ['pt'], color: "#D0D0E0" },
  { symbol: 'Au', name: 'Gold', letters: ['au'], color: "#FFD123" },
  { symbol: 'Hg', name: 'Mercury', letters: ['hg'], color: "#B8B8D0" },
  { symbol: 'Tl', name: 'Thallium', letters: ['tl'], color: "#A6544D" },
  { symbol: 'Pb', name: 'Lead', letters: ['pb'], color: "#575961" },
  { symbol: 'Bi', name: 'Bismuth', letters: ['bi'], color: "#9E4FB5" },
  { symbol: 'Po', name: 'Polonium', letters: ['po'], color: "#AB5C00" },
  { symbol: 'At', name: 'Astatine', letters: ['at'], color: "#754F45" },
  { symbol: 'Rn', name: 'Radon', letters: ['rn'], color: "#428296" },
];

// Math symbols for fallback
export const MATH_SYMBOLS = [
  { symbol: '∑', name: 'Sum' },
  { symbol: 'π', name: 'Pi' },
  { symbol: '∞', name: 'Infinity' },
  { symbol: '√', name: 'Root' },
  { symbol: 'Δ', name: 'Delta' },
  { symbol: '∫', name: 'Integral' },
  { symbol: '≈', name: 'Approx' },
  { symbol: '≠', name: 'Not equal' },
  { symbol: '≤', name: 'Less or equal' },
  { symbol: '≥', name: 'Greater or equal' },
];

// Token type for transformed lyrics
export interface TransformToken {
  type: 'element' | 'math' | 'space' | 'punctuation';
  original: string;
  transformed: string;
  elementName?: string;
  color?: string; // <-- add color property for rendering
}

// Transform a lyric line into tokens
export function transformLyricLine(line: string): TransformToken[] {
  const tokens: TransformToken[] = [];
  let i = 0;
  
  while (i < line.length) {
    const char = line[i].toLowerCase();
    
    // Handle spaces and punctuation
    if (char === ' ') {
      tokens.push({
        type: 'space',
        original: ' ',
        transformed: ' '
      });
      i++;
      continue;
    }
    
    if (!/[a-z]/.test(char)) {
      tokens.push({
        type: 'punctuation',
        original: line[i],
        transformed: line[i]
      });
      i++;
      continue;
    }
    
    // Try to match 2-letter elements first
    let matched = false;
    if (i < line.length - 1) {
      const twoChar = line.substring(i, i + 2).toLowerCase();
      const element = PERIODIC_ELEMENTS.find(el => 
        el.letters.some(letter => letter === twoChar)
      );
      
      if (element) {
        tokens.push({
          type: 'element',
          original: line.substring(i, i + 2),
          transformed: element.symbol,
          elementName: element.name,
          color: element.color // <-- pass color
        });
        i += 2;
        matched = true;
      }
    }
    
    // Try single letter elements
    if (!matched) {
      const singleChar = char;
      const element = PERIODIC_ELEMENTS.find(el => 
        el.letters.some(letter => letter === singleChar)
      );
      
      if (element) {
        tokens.push({
          type: 'element',
          original: line[i],
          transformed: element.symbol,
          elementName: element.name,
          color: element.color // <-- pass color
        });
        i++;
        matched = true;
      }
    }
    
    // Use math symbol if no element found
    if (!matched) {
      const mathSymbol = MATH_SYMBOLS[Math.floor(Math.random() * MATH_SYMBOLS.length)];
      tokens.push({
        type: 'math',
        original: line[i],
        transformed: mathSymbol.symbol,
        elementName: mathSymbol.name
      });
      i++;
    }
  }
  
  return tokens;
}

// Lyric line type for parsed LRC
export interface LyricLine {
  timestamp: string;
  original: string;
  transformed: TransformToken[];
}

// Parse and transform LRC file content
export function parseAndTransformLRC(lrcContent: string): LyricLine[] {
  const lines = lrcContent.split('\n');
  const lyricLines: LyricLine[] = [];
  
  for (const line of lines) {
    const match = line.match(/^\[(\d{2}:\d{2}\.\d{2})\](.*)$/);
    if (match) {
      const [, timestamp, text] = match;
      lyricLines.push({
        timestamp,
        original: text.trim(),
        transformed: transformLyricLine(text.trim())
      });
    }
  }
  
  return lyricLines;
}

// Format timestamp to seconds
export function formatTimeToSeconds(timestamp: string): number {
  const [minutes, seconds] = timestamp.split(':');
  const [sec, centiseconds] = seconds.split('.');
  return parseInt(minutes) * 60 + parseInt(sec) + parseInt(centiseconds) / 100;
}