const Blockchain = require('./blockchain');
const Block = require('./block');

describe('Blockchain', () => {
    let bc, bc2;

    beforeEach(() => {
        bc = new Blockchain();
        bc2 = new Blockchain();
    })

    it('Starts with genisis block', () => {
        expect(bc.chain[0]).toEqual(Block.genesis());
    });

    it('adds a new block', () => {
        const data = 'foo';
        bc.addBlock(data);

        expect(bc.chain[bc.chain.length - 1].data).toEqual(data);
    });

    it('validates a valid chain', () => {
        bc2.addBlock('rav');

        expect(bc.isValidChain(bc2.chain)).toBe(true);
    });

    it('invalidate a chain with a corrupt genisis block', () => {
        bc2.chain[0].data = 'bad data';

        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });

    it('invalidate a corrupt chain', () => {
        bc2.addBlock('tej');
        bc2.chain[1].data = 'not tej';

        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });


    it('replcaes the chain with a valid chain', () => {
        bc2.addBlock('goo');
        bc.replaceChain(bc2.chain);

        expect(bc2.chain).toEqual(bc.chain);
    });

    it('it doesnot replace the chain with lesser length', () => {
        bc.addBlock('foll');
        bc.replaceChain(bc2.chain);

        expect(bc.chain).not.toEqual(bc2.chain);
    });
});