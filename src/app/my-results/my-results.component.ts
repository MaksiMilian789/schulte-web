import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { showHideAnimation } from '../shared/animations/showHide';
import { httpResults } from '../shared/models/results';
import { HttpService } from '../shared/services/http-service.service';

@Component({
  selector: 'app-my-results',
  templateUrl: './my-results.component.html',
  styleUrls: ['./my-results.component.scss'],
  animations: [showHideAnimation],
})
export class MyResultsComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  searchControl = new FormControl('');

  private _destroy$ = new Subject<void>();

  //колонки таблицы
  displayedColumns: string[] = [
    'time',
    'mistakes',
    'date',
    'efficiency',
    'workability',
    'sustainability',
  ];

  dataSource!: MatTableDataSource<httpResults>;

  constructor(public dialog: MatDialog, private _httpService: HttpService) {
    this.searchControl.disable();
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._destroy$)
      )
      .subscribe((filterValue) => this.applyFilter(filterValue));
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  loadData(): void {
    this._httpService
      .getUserResult(sessionStorage.getItem('auth') as string)
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.paginator._intl.itemsPerPageLabel = 'Количество элементов на странице';
      });
  }

  applyFilter(filterValue: any): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  resultText(field: string, value: number): string {
    switch (field) {
      case 'workability':
        return value >= 1
          ? 'Долго сосредотачивается на основной работе'
          : 'Быстро сосредотачивается на основной работе';
      case 'sustainability':
        return value >= 1
          ? 'Низкая психическая устойчивость'
          : 'Хорошая психическая устойчивость';
    }
    return '';
  }

  /**
   * Открыть поиск
   */
  openSearch(): void {
    this.searchControl.enable();
  }

  /**
   * Закрыть поиск
   */
  closeSearch(): void {
    this.searchControl.setValue('');
    this.searchControl.disable();
  }
}
