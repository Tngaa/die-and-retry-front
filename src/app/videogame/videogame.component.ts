import { Component, OnInit } from '@angular/core';
import { VideogameService } from '../shared/services/videogame.service';
import { Videogame } from '../shared/models/videogame.model';
import { Platform } from '../shared/models/platform.model';
import { Publisher } from '../shared/models/publisher.model';
import { Developer } from '../shared/models/developer.model';
import { ConfirmationService } from 'primeng/api';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-videogame',
  templateUrl: './videogame.component.html',
  styleUrls: ['./videogame.component.scss']
})
export class VideogameComponent implements OnInit {

  public videogames: Videogame[];
  public videogamesCopy: Videogame[];

  public platforms: Platform[];
  public publishers: Publisher[];
  public developers: Developer[];

  public selectedPlatform: Platform;
  public selectedPublisher: Publisher;
  public selectedDeveloper: Developer;

  constructor(
    private videogameService: VideogameService,
    private confirmationService: ConfirmationService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.videogameService.getAllVideogames().subscribe((videogames: Videogame[]) => {
      this.videogames = videogames;
      this.videogamesCopy = videogames;
    });

    this.videogameService.getAllPlatforms().subscribe((platforms: Platform[]) => {
      this.platforms = platforms;
    });

    this.videogameService.getAllPublishers().subscribe((publishers: Publisher[]) => {
      this.publishers = publishers;
    });

    this.videogameService.getAllDevelopers().subscribe((developors: Developer[]) => {
      this.developers = developors;
    });
  }

  public logout(): void {
    this.authenticationService.logout();
  }

  /**
   * Appliquer des filtres par ordre respectif la plateforme, l'éditeur et le développeur
   */
  public onChangeFilter(): void {

    let videogames = this.videogamesCopy;

    // Si un plateforme est choisi alors on filtre par le nom du plateforme
    if (this.selectedPlatform) {
      videogames = videogames.filter((videogame: Videogame) => {
        return videogame.platform.name.includes(this.selectedPlatform.name);
      });
    }

    // Si un éditeur est choisi alors on filtre par le nom du éditeur
    if (this.selectedPublisher) {
      videogames = videogames.filter((videogame: Videogame) => {
        return videogame.publisher.name.includes(this.selectedPublisher.name);
      });
    }

    if (this.selectedDeveloper) {
      videogames = videogames.filter((videogame: Videogame) => {
        return videogame.platform.name.includes(this.selectedDeveloper.name);
      });
    }

    this.videogames = videogames;
  }

  /**
   * Vérifier si un ajout d'un jeu vidéo est en cours
   */
  public isAddingVideogame(): boolean {
    return this.videogames ? this.videogames.findIndex((videogame: Videogame) => videogame.id === undefined) > -1 : false;
  }

  /**
   * Annuler la création ou la modification d'un jeu vidéo
   */
  public cancelVideogame(): void {

    // Pour rafraichir la liste des jeux vidéos apprès la mise à jour
    this.videogameService.getAllVideogames().subscribe((videogames: Videogame[]) => {
      this.videogamesCopy = videogames;

      // Réappliquer le filtre si il existe
      this.onChangeFilter();
    });
  }

  /**
   * Créer un jeu vidéo et l'ajoute dans la data table
   */
  public createVideogame(): void {

    // Création d'un nouveau jeu
    const videogame = new Videogame();

    // Affichage en mode édition
    videogame._isModifying = true;

    // Ajout du jeu vidéo en tête de liste
    this.videogames.unshift(videogame);
  }

  /**
   * Enregistrer la création ou la modification d'un jeu video
   * 
   * @param videogame Jeu vidéo à créer ou modifier
   */
  public saveVideogame(videogame: Videogame): void {

    this.confirmationService.confirm({
      message: 'Are you sure that you want to update ' + videogame.title + ' game ?',

      // Actual logic to perform a confirmation
      accept: () => {

        // Si le jeu vidéo a un id (ce qui veut dire qu'il existe en BDD) donc il s'agit d'une mise à jour
        // Sinon (dans le cas id est null) il faudra créer le jeu vidéo en BDD
        if (videogame.id) {
          this.videogameService.updateVideogame(videogame).subscribe(() => {

            // Pour rafraichir la liste des jeux vidéos apprès la mise à jour
            this.videogameService.getAllVideogames().subscribe((videogames: Videogame[]) => {
              this.videogamesCopy = videogames;

              // Réappliquer le filtre si il existe
              this.onChangeFilter();
            });
          });
        } else {
          this.videogameService.createVideogame(videogame).subscribe(() => {

            // Pour rafraichir la liste des jeux vidéos apprès la création
            this.videogameService.getAllVideogames().subscribe((videogames: Videogame[]) => {
              this.videogamesCopy = videogames;

              // Réappliquer le filtre si il existe
              this.onChangeFilter();
            });
          })
        }
      }
    });
  }

  /**
   * Supprimer un jeu vidéo 
   * 
   * @param videogame Jeu vidéo à suppimer
   */
  public deleteVideogame(videogame: Videogame): void {

    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete ' + videogame.title + ' game ?',

      // Actual logic to perform a confirmation
      accept: () => {
        this.videogameService.deleteVideogame(videogame.id).subscribe(() => {

          // Pour rafraichir la liste des jeux vidéos apprès la suppression
          this.videogameService.getAllVideogames().subscribe((videogames: Videogame[]) => {
            this.videogamesCopy = videogames;

            // Réappliquer le filtre si il existe
            this.onChangeFilter();
          });
        });
      }
    });
  }
}