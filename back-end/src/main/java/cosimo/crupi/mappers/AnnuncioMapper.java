package cosimo.crupi.mappers;

import cosimo.crupi.entities.Annuncio;
import cosimo.crupi.payloads.AnnuncioDTO;
import cosimo.crupi.payloads.AutoDTO;
import org.springframework.stereotype.Component;

@Component
public class AnnuncioMapper {
    // MAPPER da Annuncio Entity to DTO
    public AnnuncioDTO mapDTO(Annuncio annuncio) {
        return new AnnuncioDTO(
                annuncio.getId(),
                annuncio.getTitolo(),
                annuncio.getDescrizione(),
                annuncio.getPrezzo(),
                new AutoDTO(
                        annuncio.getAuto().getMarca(),
                        annuncio.getAuto().getModello(),
                        annuncio.getAuto().getAnno(),
                        annuncio.getAuto().getPotenza(),
                        annuncio.getAuto().getCambio(),
                        annuncio.getAuto().getCarburante(),
                        annuncio.getAuto().getChilometri()
                ),
                annuncio.getImgAuto(),
                annuncio.getDataPubblicazione(),
                annuncio.getUtente().getNumCellulare()
        );
    }
}
